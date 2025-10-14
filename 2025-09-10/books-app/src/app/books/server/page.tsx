import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'

type Book = {
  id: number
  title: string
  author: string
  year: number
}

export default async function ServerBooksPage({
  searchParams,
}: {
  searchParams: { edit?: string }
}) {
  const supabase = await createServerClient()
  const editingId = searchParams.edit ? parseInt(searchParams.edit) : null

  const { data: books, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })

  async function createBook(formData: FormData) {
    'use server'

    const supabase = await createServerClient()
    const title = formData.get('title') as string
    const author = formData.get('author') as string
    const year = parseInt(formData.get('year') as string)

    await supabase.from('books').insert({ title, author, year })

    revalidatePath('/books/server')
  }

  async function updateBook(formData: FormData) {
    'use server'

    const supabase = await createServerClient()
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const author = formData.get('author') as string
    const year = parseInt(formData.get('year') as string)

    await supabase.from('books').update({ title, author, year }).eq('id', id)

    revalidatePath('/books/server')
  }

  async function deleteBook(formData: FormData) {
    'use server'

    const supabase = await createServerClient()
    const id = formData.get('id') as string

    await supabase.from('books').delete().eq('id', id)

    revalidatePath('/books/server')
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
        <p className="text-gray-600 mb-8">Server Component - Create, Read, Update, Delete</p>

        {/* CREATE FORM */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
          <form action={createBook} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Book title"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Author</label>
                <input
                  type="text"
                  name="author"
                  placeholder="Author name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <input
                  type="number"
                  name="year"
                  placeholder="2024"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Add Book
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            Error: {error.message}
          </div>
        )}

        {/* READ / UPDATE / DELETE */}
        <div className="bg-white rounded-lg shadow">
          <h2 className="text-2xl font-semibold p-6 border-b">Your Books</h2>
          {books && books.length > 0 ? (
            <div className="divide-y">
              {books.map((book: Book) => (
                <div key={book.id} className="p-6">
                  {editingId === book.id ? (
                    // UPDATE MODE
                    <form action={updateBook} className="space-y-4">
                      <input type="hidden" name="id" value={book.id} />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                          type="text"
                          name="title"
                          defaultValue={book.title}
                          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <input
                          type="text"
                          name="author"
                          defaultValue={book.author}
                          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <input
                          type="number"
                          name="year"
                          defaultValue={book.year}
                          className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          Save
                        </button>
                        <Link
                          href="/books/server"
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 inline-flex items-center"
                        >
                          Cancel
                        </Link>
                      </div>
                    </form>
                  ) : (
                    // READ MODE
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
                        <p className="text-gray-600">by {book.author}</p>
                        <p className="text-sm text-gray-500">Published: {book.year}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/books/server?edit=${book.id}`}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                        >
                          Edit
                        </Link>
                        <form action={deleteBook} className="inline">
                          <input type="hidden" name="id" value={book.id} />
                          <button
                            type="submit"
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </form>
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
