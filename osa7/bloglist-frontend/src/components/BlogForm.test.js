import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> calls event handler with correct information', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('write here blog title')
  const authorInput = screen.getByPlaceholderText('write here blog author')
  const urlInput = screen.getByPlaceholderText('write here blog url')
  const sendButton = screen.getByText('create')

  userEvent.type(titleInput, 'Written Title')
  userEvent.type(authorInput, 'Written Author')
  userEvent.type(urlInput, 'Written Url')
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Written Title',
    author: 'Written Author',
    url: 'Written Url',
  })
})
