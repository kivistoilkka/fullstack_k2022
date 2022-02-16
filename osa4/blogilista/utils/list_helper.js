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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}