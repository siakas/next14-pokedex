import { useQuery } from '@tanstack/react-query'

const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) {
    throw new Error('Failed to fetch posts')
  }
  return res.json()
}

export const usePosts = () => {
  return useQuery({ queryKey: ['posts'], queryFn: fetchPosts })
}
