import type { NextApiRequest, NextApiResponse, NextPage } from 'next'
import { Post } from '@prisma/client'
import NewPost from '../components/newpost'
import PostCard from '../components/PostCard'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useState } from 'react'

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  const posts = await fetch(`${process.env.BASE_URL}/api/posts`).then(r =>
    r.json()
  )
  return {
    props: { posts },
  }
}

const Home = ({ posts }: { posts: Post[] }) => {
  const [postState, setPostState] = useState(posts)
  const [loading, setLoading] = useState(false)
  const { data: session }: { data: Session | null } = useSession()

  const createPost = async ({
    secure_url,
    desc,
  }: {
    secure_url: any
    desc: string
  }) => {
    setLoading(true)
    try {
      await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
          imageUrl: secure_url,
          description: desc,
        }),
      })
    } catch (error) {
      toast.error('Error occured while creating the post')
      throw error
    }

    // fetching posts again
    const posts = await fetch('api/posts').then(r => r.json())
    setPostState(posts)
    toast.success('Post created!')
    setLoading(false)
  }

  const deletePost = async (id: any) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      }).then(r => r.json())
    } catch (error) {
      toast.error('Error occured while deleting the post')
      throw error
    }
    setPostState(prevState => prevState.filter(post => post.id !== id))
    toast.success('Post deleted')
  }

  return (
    <div className='max-w-xl mt-10 mx-10'>
      <NewPost loading={loading} createPost={createPost} className='mb-6' />
      {postState.length === 0 ? (
        <h1 className='text-3xl text-center font-bold'>No posts</h1>
      ) : (
        postState.map(post => (
          <PostCard post={post} session={session} deletePost={deletePost} />
        ))
      )}
    </div>
  )
}

export default Home
