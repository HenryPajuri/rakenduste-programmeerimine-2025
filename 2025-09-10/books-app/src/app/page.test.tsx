import { render, screen } from '@testing-library/react'
import Home from './page'

describe('Home Page', () => {
  it('should render welcome message', () => {
    render(<Home />)

    expect(screen.getByText(/books library/i)).toBeInTheDocument()
    expect(screen.getByText(/manage your book collection/i)).toBeInTheDocument()
  })

  it('should have links to client and server pages', () => {
    render(<Home />)

    const clientLink = screen.getByRole('link', { name: /client component/i })
    const serverLink = screen.getByRole('link', { name: /server component/i })

    expect(clientLink).toBeInTheDocument()
    expect(clientLink).toHaveAttribute('href', '/books/client')

    expect(serverLink).toBeInTheDocument()
    expect(serverLink).toHaveAttribute('href', '/books/server')
  })
})
