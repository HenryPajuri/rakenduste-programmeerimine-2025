import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Books Library</h1>
        <p className="text-gray-600 mb-8">Manage your book collection with CRUD operations</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/books/client"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Client Component
          </Link>
          <Link
            href="/books/server"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Server Component
          </Link>
        </div>
      </div>
    </div>
  )
}
