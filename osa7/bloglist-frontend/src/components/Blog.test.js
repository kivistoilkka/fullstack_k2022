import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
      blogs: [],
    },
  }

  const user = {
    username: 'tester',
    name: 'TestUser',
    blogs: [],
  }

  const increaseMockHandler = jest.fn()
  const deleteMockHandler = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        increaseLikes={increaseMockHandler}
        deleteBlog={deleteMockHandler}
        user={user}
      />
    ).container
  })

  test('renders blog title and author, but not url and likes by default', () => {
    const visibleDiv = container.querySelector('.visibleByDefaultBlogInfo')
    expect(visibleDiv).toHaveTextContent('TestBlog TestAuthor', {
      exact: false,
    })
    expect(visibleDiv).not.toHaveTextContent('http://www.helsinki.fi', {
      exact: false,
    })
    expect(visibleDiv).not.toHaveTextContent('likes 0', { exact: false })
    expect(visibleDiv).not.toHaveStyle('display: none')

    const hiddenDiv = container.querySelector('.hiddenByDefaultBlogInfo')
    expect(hiddenDiv).toHaveTextContent('TestBlog TestAuthor', {
      exact: false,
    })
    expect(hiddenDiv).toHaveTextContent('http://www.helsinki.fi', {
      exact: false,
    })
    expect(hiddenDiv).toHaveTextContent('likes 0', { exact: false })
    expect(hiddenDiv).toHaveStyle('display: none')
  })

  test('url and likes are also visible after the view button is pressed', () => {
    const button = screen.getByText('view')
    userEvent.click(button)

    const visibleDiv = container.querySelector('.visibleByDefaultBlogInfo')
    const hiddenDiv = container.querySelector('.hiddenByDefaultBlogInfo')

    expect(visibleDiv).toHaveStyle('display: none')
    expect(hiddenDiv).not.toHaveStyle('display: none')
  })

  test('clicking the like button twice calls event handler twice', () => {
    const button = screen.getByText('like')
    userEvent.click(button)
    userEvent.click(button)

    expect(increaseMockHandler.mock.calls).toHaveLength(2)
  })
})
