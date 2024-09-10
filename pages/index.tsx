import Layout from '@/components/layout/Layout'
import { usePosts } from '@/hooks/usePosts'

export default function Home() {
  const { data: posts, isLoading, isError } = usePosts()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching posts</div>

  return (
    <Layout>
      <main className="p-8">
        <h1 className="mb-4 text-2xl font-bold">Posts</h1>
        <ul>
          {posts &&
            posts.map((post) => (
              <li
                key={post.id}
                className="mb-2 rounded border p-3 even:bg-gray-50"
              >
                {post.title}
              </li>
            ))}
        </ul>
      </main>
    </Layout>
  )
}
