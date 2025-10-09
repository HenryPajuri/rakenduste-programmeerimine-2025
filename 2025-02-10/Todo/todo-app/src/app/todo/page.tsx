'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Todo = {
  id: number
  task: string
  created_at: string
}

export default function TodoPage() {
  const [task, setTask] = useState('')
  const [message, setMessage] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTask, setEditTask] = useState('')

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setMessage(`Error fetching todos: ${error.message}`)
    } else {
      setTodos(data || [])
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!task.trim()) {
      setMessage('Please enter a task')
      return
    }

    const { error } = await supabase
      .from('todos')
      .insert([{ task }])

    if (error) {
      setMessage(`Error: ${error.message}`)
    } else {
      setMessage('Todo created successfully!')
      setTask('')
      fetchTodos()
    }
  }

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (error) {
      setMessage(`Error deleting todo: ${error.message}`)
    } else {
      setMessage('Todo deleted successfully!')
      fetchTodos()
    }
  }

  const handleUpdate = async (id: number) => {
    if (!editTask.trim()) {
      setMessage('Please enter a task')
      return
    }

    const { error } = await supabase
      .from('todos')
      .update({ task: editTask })
      .eq('id', id)

    if (error) {
      setMessage(`Error updating todo: ${error.message}`)
    } else {
      setMessage('Todo updated successfully!')
      setEditingId(null)
      setEditTask('')
      fetchTodos()
    }
  }

  const handleEdit = (id: number, currentTask: string) => {
    setEditingId(id)
    setEditTask(currentTask)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditTask('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Todo App</h1>

        <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Todo
          </button>
        </form>

        {message && (
          <p className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg">{message}</p>
        )}

        <div className="bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-gray-800 p-4 border-b">Todos</h2>
          <ul className="divide-y">
            {todos.map((todo) => (
              <li key={todo.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                {editingId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdate(todo.id)}
                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-600 text-white px-4 py-1 rounded hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-gray-700">{todo.task}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(todo.id, todo.task)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
