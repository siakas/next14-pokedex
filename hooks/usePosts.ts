import { useQuery } from '@tanstack/react-query'

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  return res.json()
}

export const usePosts = () => {
  return useQuery({ queryKey: ['posts'], queryFn: fetchPosts })
}
