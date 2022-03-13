const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map((r) => r.title)
    expect(titles).toContain('Canonical string reduction')
  })

  test('id property is present and _id property is not present', async () => {
    const response = await api.get('/api/blogs')
    response.body.map((b) => {
      expect(b.id).toBeDefined()
      expect(b._id).not.toBeDefined()
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'Super interesting blog',
        author: 'Imaginary Person',
        url: 'http://made.up.address/',
        likes: 9,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map((r) => r.title)
      expect(titles).toContain('Super interesting blog')
    })

    test('blog without likes gets like value 0', async () => {
      const newBlog = {
        title: 'Very new blog',
        author: 'Imaginary Person',
        url: 'http://made.up.address/',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const addedBlog = blogsAtEnd.filter((b) => b.title === 'Very new blog')[0]
      expect(addedBlog).toBeDefined()
      expect(addedBlog.likes).toEqual(0)
    })

    test('fails with status code 400 if title is not present', async () => {
      const newBlog = {
        author: 'Imaginary Person',
        url: 'http://made.up.address/',
        likes: 9,
      }

      await api.post('/api/blogs').send(newBlog).expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('fails with status code 400 if url is not present', async () => {
      const newBlog = {
        title: 'Blog without url',
        author: 'Imaginary Person',
        likes: 9,
      }

      await api.post('/api/blogs').send(newBlog).expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map((r) => r.title)
      expect(titles).not.toContain(blogToDelete.title)
    })

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '620845a020515562b992858'

      await api.delete(`/api/blogs/${invalidId}`).expect(400)
    })
  })

  describe('modification of a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToModify = blogsAtStart[0]

      const newBlog = {
        title: blogToModify.title,
        author: blogToModify.author,
        url: blogToModify.url,
        likes: blogToModify.likes + 10,
      }

      await api
        .put(`/api/blogs/${blogToModify.id}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const modifiedBlog = blogsAtEnd.filter((b) => b.id === blogToModify.id)[0]
      expect(modifiedBlog.likes).toEqual(blogToModify.likes + 10)
    })

    test('fails with status code 404 if blog does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId()

      const newBlog = {
        title: 'This will not be sent',
        author: 'Unknown',
        url: 'Secret',
        likes: 9000,
      }

      await api
        .put(`/api/blogs/${validNonExistingId}`)
        .send(newBlog)
        .expect(404)
    })

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '620845a020515562b992858'

      const newBlog = {
        title: 'This will not be sent',
        author: 'Unknown',
        url: 'Secret',
        likes: 9000,
      }

      await api.put(`/api/blogs/${invalidId}`).send(newBlog).expect(400)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
