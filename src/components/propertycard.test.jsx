import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import PropertyCard from './PropertyCard'

const mockProperty = {
  id: 'prop1',
  type: 'House',
  price: 450000,
  bedrooms: 3,
  location: 'London',
  heroImages: ['test.jpg']
}

test('displays property information', () => {
  render(
    <BrowserRouter>
      <PropertyCard property={mockProperty} onFavourite={vi.fn()} />
    </BrowserRouter>
  )

  expect(screen.getByText(/house/i)).toBeInTheDocument()
  expect(screen.getByText(/£450,000/i)).toBeInTheDocument()
  expect(screen.getByText(/3 bedrooms/i)).toBeInTheDocument()
})
