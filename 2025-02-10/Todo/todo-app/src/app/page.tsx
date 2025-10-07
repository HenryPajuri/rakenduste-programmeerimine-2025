'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type Todo = {
  id: number
  task: string
  created_at: string
}

export default function Home() {
  const [task, setTask] = useState('')
  const [message, setMessage] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

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

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <button type="submit">Add Todo</button>
      </form>
      {message && <p>{message}</p>}

      <h2>Todos</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  )
}
