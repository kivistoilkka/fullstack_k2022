const _ = require('lodash')

const dummy = (blogs) => {
  blogs // to keep ESLint happy
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const firstBlog = blogs[0]

  if (firstBlog === undefined) {
    return undefined
  }

  const formatBlog = (blog) => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }
  }
  const moreLikes = (most, blog) => {
    return most.likes < formatBlog(blog).likes
      ? formatBlog(blog)
      : most
  }
  return blogs.reduce(moreLikes, formatBlog(firstBlog))
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  const most = _
    .chain(blogs)
    .groupBy(blog => blog.author)
    .mapValues(author => author.length)
    .toPairs()
    .maxBy(_.last)
    .value()

  return {
    author: most[0],
    blogs: most[1]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }

  let authors = []

  _.chain(blogs)
    .groupBy(blog => blog.author)
    .forEach((value, key) => {
      const author = {
        author: key,
        likes: _.reduce(value, (acc, current) => acc + current.likes, 0)
      }
      authors.push(author)
    })
    .value()

  const mostLikes = _.maxBy(authors, 'likes')

  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}