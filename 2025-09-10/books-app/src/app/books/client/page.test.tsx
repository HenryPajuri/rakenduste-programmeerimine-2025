import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ClientBooksPage from './page'
import { supabase } from '@/lib/supabase/client'

jest.mock('@/lib/supabase/client', () => ({
  supabase: {
    from: jest.fn(),
  },
}))

type Book = {
  id: number
  title: string
  author: string
  year: number
}

describe('ClientBooksPage CRUD', () => {
  const mockOrder = jest.fn()
  const mockSelect = jest.fn()
  const mockInsert = jest.fn()
  const mockEq = jest.fn()
  const mockDelete = jest.fn()
  const mockUpdate = jest.fn()

  const setupMocks = (books: Book[] = []) => {
    mockOrder.mockResolvedValue({ data: books, error: null })
    mockSelect.mockReturnValue({ order: mockOrder })
    mockInsert.mockReturnValue({
      select: jest.fn().mockReturnValue({
        single: jest.fn().mockResolvedValue({
          data: { id: 999, title: 'New Book', author: 'New Author', year: 2024 },
          error: null
        }),
      }),
    })
    mockEq.mockResolvedValue({ error: null })
    mockDelete.mockReturnValue({ eq: mockEq })
    mockUpdate.mockReturnValue({ eq: mockEq })

    ;(supabase.from as jest.Mock).mockReturnValue({
      select: mockSelect,
      insert: mockInsert,
      delete: mockDelete,
      update: mockUpdate,
    })
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Read Books', () => {
    it('should fetch and display books', async () => {
      setupMocks([
        { id: 1, title: '1984', author: 'George Orwell', year: 1949 },
        { id: 2, title: 'Brave New World', author: 'Aldous Huxley', year: 1932 },
      ])

      render(<ClientBooksPage />)

      await waitFor(() => {
        expect(screen.getByText('1984')).toBeInTheDocument()
        expect(screen.getByText(/George Orwell/i)).toBeInTheDocument()
        expect(screen.getByText('Brave New World')).toBeInTheDocument()
      })
    })

    it('should show empty state', async () => {
      setupMocks([])
      render(<ClientBooksPage />)

      await waitFor(() => {
        expect(screen.getByText(/no books yet/i)).toBeInTheDocument()
      })
    })
  })

  describe('Create Book', () => {
    it('should create a new book', async () => {
      setupMocks([])
      render(<ClientBooksPage />)

      await waitFor(() => supabase.from)

      fireEvent.change(screen.getByPlaceholderText(/book title/i), { target: { value: 'New Book' } })
      fireEvent.change(screen.getByPlaceholderText(/author name/i), { target: { value: 'Author' } })
      fireEvent.change(screen.getByPlaceholderText('2024'), { target: { value: '2024' } })
      fireEvent.click(screen.getByRole('button', { name: /add book/i }))

      await waitFor(() => {
        expect(mockInsert).toHaveBeenCalledWith({ title: 'New Book', author: 'Author', year: 2024 })
      })
    })
  })

  describe('Update Book', () => {
    it('should update book', async () => {
      setupMocks([{ id: 1, title: 'Old Title', author: 'Old Author', year: 2020 }])
      render(<ClientBooksPage />)

      await waitFor(() => screen.getByText('Old Title'))

      fireEvent.click(screen.getByRole('button', { name: /edit/i }))

      const inputs = screen.getAllByDisplayValue('Old Title')
      fireEvent.change(inputs[0], { target: { value: 'Updated Title' } })
      fireEvent.click(screen.getByRole('button', { name: /save/i }))

      await waitFor(() => {
        expect(mockEq).toHaveBeenCalled()
      })
    })
  })

  describe('Delete Book', () => {
    it('should delete book', async () => {
      setupMocks([{ id: 1, title: 'To Delete', author: 'Author', year: 2020 }])
      render(<ClientBooksPage />)

      await waitFor(() => screen.getByText('To Delete'))

      const deleteButtons = screen.getAllByRole('button', { name: /delete/i })
      fireEvent.click(deleteButtons[0])

      await waitFor(() => {
        expect(mockEq).toHaveBeenCalled()
      })
    })
  })
})
