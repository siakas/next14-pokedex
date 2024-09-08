import Layout from '@/components/layout/Layout'
import { usePosts } from '@/hooks/usePosts'

export default function Home() {
  const { data: posts, isLoading, isError } = usePosts()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching posts</div>

  return (
    <Layout>
      <main>
        <h1>Posts</h1>
        <ul>
          {posts && posts.map((post) => <li key={post.id}>{post.title}</li>)}
        </ul>
      </main>
    </Layout>
  )
}
