import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

test('renders estate agent app', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )

  expect(
    screen.getByRole('heading', { name: /search properties/i })
  ).toBeInTheDocument()
})
