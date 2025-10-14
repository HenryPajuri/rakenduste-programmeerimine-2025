import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TodoPage from './page'
import { supabase } from '@/lib/supabase'

jest.mock('@/lib/supabase', () => ({
  supabase: {
    from: jest.fn(),
  },
}))

type Todo = {
  id: number
  task: string
  created_at: string
}

describe('TodoPage', () => {
  const mockOrder = jest.fn()
  const mockSelect = jest.fn()
  const mockInsert = jest.fn()
  const mockEq = jest.fn()
  const mockDelete = jest.fn()
  const mockUpdate = jest.fn()

  const setupMocks = (todos: Todo[] = []) => {
    mockOrder.mockResolvedValue({ data: todos, error: null })
    mockSelect.mockReturnValue({ order: mockOrder })
    mockInsert.mockResolvedValue({ error: null })
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

  describe('Read Todos', () => {
    it('should fetch and display todos', async () => {
      setupMocks([
        { id: 1, task: 'First task', created_at: '2024-01-01' },
        { id: 2, task: 'Second task', created_at: '2024-01-02' },
      ])

      render(<TodoPage />)

      await waitFor(() => {
        expect(screen.getByText('First task')).toBeInTheDocument()
        expect(screen.getByText('Second task')).toBeInTheDocument()
      })
    })

    it('should show empty list when no todos', async () => {
      setupMocks([])
      render(<TodoPage />)

      await waitFor(() => {
        expect(supabase.from).toHaveBeenCalledWith('todos')
      })
    })
  })

  describe('Create Todo', () => {
    it('should create a new todo', async () => {
      setupMocks([])
      render(<TodoPage />)

      await waitFor(() => supabase.from)

      const input = screen.getByPlaceholderText(/enter a task/i)
      const button = screen.getByRole('button', { name: /add todo/i })

      fireEvent.change(input, { target: { value: 'New task' } })
      fireEvent.click(button)

      await waitFor(() => {
        expect(mockInsert).toHaveBeenCalledWith([{ task: 'New task' }])
      })
    })

    it('should show error when task is empty', async () => {
      setupMocks([])
      render(<TodoPage />)

      await waitFor(() => supabase.from)

      const button = screen.getByRole('button', { name: /add todo/i })
      fireEvent.click(button)

      await waitFor(() => {
        expect(screen.getByText(/please enter a task/i)).toBeInTheDocument()
      })

      expect(mockInsert).not.toHaveBeenCalled()
    })
  })

  describe('Update Todo', () => {
    it('should update todo task', async () => {
      setupMocks([{ id: 1, task: 'Original task', created_at: '2024-01-01' }])
      render(<TodoPage />)

      await waitFor(() => screen.getByText('Original task'))

      fireEvent.click(screen.getByRole('button', { name: /edit/i }))

      const editInput = screen.getByDisplayValue('Original task')
      fireEvent.change(editInput, { target: { value: 'Updated task' } })
      fireEvent.click(screen.getByRole('button', { name: /save/i }))

      await waitFor(() => {
        expect(mockEq).toHaveBeenCalled()
      })
    })

    it('should cancel edit', async () => {
      setupMocks([{ id: 1, task: 'Test task', created_at: '2024-01-01' }])
      render(<TodoPage />)

      await waitFor(() => screen.getByText('Test task'))

      fireEvent.click(screen.getByRole('button', { name: /edit/i }))
      expect(screen.getByDisplayValue('Test task')).toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: /cancel/i }))

      await waitFor(() => {
        expect(screen.queryByDisplayValue('Test task')).not.toBeInTheDocument()
      })
    })
  })

  describe('Delete Todo', () => {
    it('should delete a todo', async () => {
      setupMocks([{ id: 1, task: 'Task to delete', created_at: '2024-01-01' }])
      render(<TodoPage />)

      await waitFor(() => screen.getByText('Task to delete'))

      fireEvent.click(screen.getByRole('button', { name: /delete/i }))

      await waitFor(() => {
        expect(mockEq).toHaveBeenCalled()
      })
    })
  })
})
