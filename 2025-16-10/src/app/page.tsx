import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <main className="flex flex-col gap-4 items-center">
        <h1 className="text-4xl font-bold mb-8">Welcome</h1>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Link href="/form">
            <button className="bg-gray-300 px-6 py-3 rounded hover:bg-gray-400 transition-colors min-w-[200px]">
              Go to User Form
            </button>
          </Link>
          <Link href="/api-demo">
            <button className="bg-gray-300 px-6 py-3 rounded hover:bg-gray-400 transition-colors min-w-[200px]">
              API Demo (Client)
            </button>
          </Link>
          <Link href="/api-demo-server">
            <button className="bg-gray-300 px-6 py-3 rounded hover:bg-gray-400 transition-colors min-w-[200px]">
              API Demo (Server)
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
