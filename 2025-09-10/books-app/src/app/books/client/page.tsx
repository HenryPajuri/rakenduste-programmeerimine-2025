'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

type Book = {
  id: number
  title: string
  author: string
  year: number
}

export default function ClientBooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editAuthor, setEditAuthor] = useState('')
  const [editYear, setEditYear] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setBooks(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !author.trim() || !year) return

    try {
      setSubmitting(true)
      const { data, error } = await supabase
        .from('books')
        .insert({ title, author, year: parseInt(year) })
        .select()
        .single()

      if (error) throw error

      setBooks([data, ...books])
      setTitle('')
      setAuthor('')
      setYear('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleUpdate(id: number) {
    if (!editTitle.trim() || !editAuthor.trim() || !editYear) return

    try {
      const { error } = await supabase
        .from('books')
        .update({ title: editTitle, author: editAuthor, year: parseInt(editYear) })
        .eq('id', id)

      if (error) throw error

      setBooks(books.map(book =>
        book.id === id
          ? { ...book, title: editTitle, author: editAuthor, year: parseInt(editYear) }
          : book
      ))
      setEditingId(null)
    } catch (err: any) {
      setError(err.message)
    }
  }

  async function handleDelete(id: number) {
    const previousBooks = [...books]
    setBooks(books.filter(book => book.id !== id))

    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', id)

      if (error) throw error
    } catch (err: any) {
      setBooks(previousBooks)
      setError(err.message)
    }
  }

  function startEdit(book: Book) {
    setEditingId(book.id)
    setEditTitle(book.title)
    setEditAuthor(book.author)
    setEditYear(book.year.toString())
  }

  function cancelEdit() {
    setEditingId(null)
    setEditTitle('')
    setEditAuthor('')
    setEditYear('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">Books Library</h1>
        <p className="text-gray-600 mb-8">Client Component - Create, Read, Update, Delete</p>

        {/* CREATE FORM */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Book title"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2024"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Adding...' : 'Add Book'}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* READ / UPDATE / DELETE */}
        <div className="bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold p-6 border-b">Your Books</h2>
          {loading ? (
            <p className="p-6 text-gray-600">Loading books...</p>
          ) : books.length > 0 ? (
            <div className="divide-y">
              {books.map((book) => (
                <div key={book.id} className="p-6">
                  {editingId === book.id ? (
                    // UPDATE MODE
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          value={editAuthor}
                          onChange={(e) => setEditAuthor(e.target.value)}
                          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="number"
                          value={editYear}
                          onChange={(e) => setEditYear(e.target.value)}
                          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(book.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // READ MODE
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                        <p className="text-gray-600">by {book.author}</p>
                        <p className="text-sm text-gray-500">Published: {book.year}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(book)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="p-6 text-gray-600">No books yet. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  )
}
