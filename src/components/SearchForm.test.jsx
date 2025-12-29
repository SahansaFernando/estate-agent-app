import { render, screen } from '@testing-library/react'
import SearchForm from './SearchForm'

test('renders search form fields', () => {
  render(<SearchForm />)

  expect(screen.getByPlaceholderText(/min price/i)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/max price/i)).toBeInTheDocument()
  expect(screen.getByPlaceholderText(/postcode/i)).toBeInTheDocument()
})
