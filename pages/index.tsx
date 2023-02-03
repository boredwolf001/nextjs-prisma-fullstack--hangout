import type { NextApiRequest, NextApiResponse, NextPage } from 'next'
import { getServerSession, Session } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import { authOptions } from './api/auth/[...nextauth]'

type Post = {
  title: string
  description: string
}

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  const session: Session | null = await getServerSession(req, res, authOptions)

  if (!session?.user)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }

  const postsResponse = await fetch('http://localhost:3000/api/posts')
  const posts = await postsResponse.json()

  return {
    props: { posts },
  }
}

const Home = ({ posts }: { posts: Post[] }) => {
  const { data: session } = useSession()

  return (
    <div className='mx-auto w-fit'>
      <h1 className='text-4xl font-bold my-10 text-ellipsis'>
        Latest posts from your firends
      </h1>
      {posts.map(post => (
        <div className=' mt-6 card w-auto bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title'>{post.title}</h2>
            <p>{post.description}</p>
            <div className='card-actions'>
              <button className='btn'>♥</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
