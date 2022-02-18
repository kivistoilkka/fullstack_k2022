const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

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
  const titles = response.body.map(r => r.title)
  expect(titles).toContain('Canonical string reduction')
})

test('id property is present and _id property is not present', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(b => {
    expect(b.id).toBeDefined()
    expect(b._id).not.toBeDefined()
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Super interesting blog',
    author: 'Imaginary Person',
    url: 'http://made.up.address/',
    likes: 9
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
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
  const addedBlog = blogsAtEnd.filter(b => b.title === 'Very new blog')[0]
  expect(addedBlog).toBeDefined()
  expect(addedBlog.likes).toEqual(0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Imaginary Person',
    url: 'http://made.up.address/',
    likes: 9
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Blog without url',
    author: 'Imaginary Person',
    likes: 9
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})