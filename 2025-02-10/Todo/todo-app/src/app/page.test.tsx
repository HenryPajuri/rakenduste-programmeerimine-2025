import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home Page', () => {
  it('should render welcome message', () => {
    render(<Home />)

    expect(screen.getByText(/welcome to todo app/i)).toBeInTheDocument()
  })

  it('should have link to todo page', () => {
    render(<Home />)

    const link = screen.getByRole('link', { name: /go to todos/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/todo')
  })
})
