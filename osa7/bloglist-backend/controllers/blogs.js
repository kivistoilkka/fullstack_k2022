const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
    comments: [],
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  if (
    !request.token ||
    !decodedToken.id ||
    !blog ||
    blog.user.toString() !== decodedToken.id.toString()
  ) {
    return response
      .status(401)
      .json({ error: 'token missing or invalid or id invalid' })
  }

  const user = await User.findById(decodedToken.id)
  const removedBlog = await Blog.findByIdAndRemove(request.params.id)
  user.blogs = user.blogs.filter(
    (b) => b._id.toString() !== removedBlog._id.toString()
  )
  await user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, comments } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, comments },
    { new: true, runValidators: true, context: 'query' }
  )

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const comment = request.body.comment
  const blogToComment = await Blog.findById(request.params.id)
  if (!blogToComment) {
    response.status(404).end()
  }

  const updatedComments = blogToComment.comments.concat(comment)

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { comments: updatedComments },
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(updatedBlog)
})

module.exports = blogsRouter
