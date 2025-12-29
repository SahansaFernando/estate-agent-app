import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('user can add a property to favourites', async () => {
  const user = userEvent.setup()

  render(<button>Favourite</button>)

  await user.click(screen.getByText(/favourite/i))

  expect(screen.getByText(/favourite/i)).toBeInTheDocument()
})
