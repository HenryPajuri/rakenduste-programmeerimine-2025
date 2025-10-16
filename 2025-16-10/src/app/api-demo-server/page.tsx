interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    cache: 'no-store', 
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data = await response.json();
  return data.slice(0, 10); 
}

export default async function ApiDemoServerPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">API Demo - Server Component</h1>
      <p className="mb-4 text-gray-600">
        Fetching data from JSONPlaceholder API (Server-side)
      </p>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">
              {post.id}. {post.title}
            </h2>
            <p className="text-gray-700">{post.body}</p>
            <p className="text-sm text-gray-500 mt-2">User ID: {post.userId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
