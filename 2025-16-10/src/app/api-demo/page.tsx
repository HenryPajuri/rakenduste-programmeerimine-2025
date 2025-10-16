'use client';

import { useState, useEffect } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function ApiDemoPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data.slice(0, 10));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">API Demo - Client Component</h1>
      <p className="mb-4 text-gray-600">
        Fetching data from JSONPlaceholder API (Client-side)
      </p>

      {loading && (
        <div className="text-blue-600">Loading posts...</div>
      )}

      {error && (
        <div className="text-red-600 bg-red-50 p-4 rounded">
          Error: {error}
        </div>
      )}

      {!loading && !error && (
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
      )}
    </div>
  );
}
