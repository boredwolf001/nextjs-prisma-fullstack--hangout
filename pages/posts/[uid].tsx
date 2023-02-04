import { Post, User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse, NextPage } from 'next'
import { getServerSession, Session } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]'

export async function getServerSideProps(context: any) {
  const session: Session | null = await getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (!session?.user)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }

  return {
    props: { session },
  }
}

const Home = ({ session }: { session: Session }) => {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState([])

  const { query } = useRouter()
  console.log(query)

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsResponse = await fetch(
          `${process.env.BASE_URL}/api/posts/${query.uid}`
        )
        const { posts, user } = await postsResponse.json()
        console.log(`Fetched posts and user >> ${posts} | ${user}`)
        setPosts(posts)
        setUser(user)
      } catch (error) {
        console.error(`Error occured: ${error}`)
      }
    }

    getPosts()
  }, [])

  return (
    <div className='mx-64 my-10'>
      {/* avatar */}
      <div className='inline-flex gap-6 mt-10'>
        <div className='avatar'>
          <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src={user.image!} />
          </div>
        </div>
        <div>
          <small className='block text-2xl font-medium text-primary'>
            {user.name}
          </small>
          <small className='block text-xl font-medium text-gray-500'>
            {user.email}
          </small>
        </div>
      </div>

      {posts.map(post => (
        <div className=' mt-6 card w-96 bg-base-100 shadow-xl'>
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
