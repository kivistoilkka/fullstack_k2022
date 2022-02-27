import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    title: 'TestBlog',
    author: 'TestAuthor',
    url: 'http://www.helsinki.fi',
    likes: 0,
    user: {
      username: 'tester',
      name: 'TestUser',
      blogs: []
    }
  }

  const user = {
    username: 'tester',
    name: 'TestUser',
    blogs: []
  }

  const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        increaseLikes={mockHandler}
        deleteBlog={mockHandler}
        user={user}
      />
    ).container
  })

  test('renders blog title and author, but not url and likes by default', () => {
    const blogDiv = container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent('TestBlog TestAuthor')

    const visibleDiv = container.querySelector('.visibleByDefaultBlogInfo')
    expect(visibleDiv).not.toHaveStyle('display: none')

    const hiddenDiv = container.querySelector('.hiddenByDefaultBlogInfo')
    expect(hiddenDiv).toHaveStyle('display: none')
  })
})

