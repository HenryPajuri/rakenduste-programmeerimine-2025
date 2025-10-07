import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Welcome to Todo App</h1>
      <Link href="/todo">Go to Todos</Link>
    </div>
  )
}
