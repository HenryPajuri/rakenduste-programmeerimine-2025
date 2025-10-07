'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [task, setTask] = useState('')
  const [message, setMessage] = useState('')

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
    </div>
  )
}
