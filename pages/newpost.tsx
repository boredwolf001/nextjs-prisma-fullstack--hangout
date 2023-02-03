import { getServerSession } from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from './api/auth/[...nextauth]'
import { signIn } from 'next-auth/react'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

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

  return {
    props: {},
  }
}

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const createNewPost = async () => {
    try {
      await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, description: desc }),
      })
      toast.success('Heyyo! New post created./')
    } catch (e) {
      toast.error('An error occured')
      return console.log(`An error occured while creating the post ${e}`)
    }
  }

  return (
    <div className='mx-auto w-fit mt-10 '>
      <h1 className='text-5xl font-bold mb-8 text-primary'>
        Share your feelings with friends
      </h1>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>Title</span>
        </label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type='text'
          placeholder='Type here...'
          className='input input-bordered w-full max-w-xs'
        />
        <label className='label'>
          <span className='label-text'>
            We would love to here more about ur story
          </span>
        </label>
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          className='textarea textarea-bordered h-24'
          placeholder='...'></textarea>

        <button
          className='mt-4 btn btn-secondary'
          type='submit'
          onClick={createNewPost}>
          Submit
        </button>
      </div>
    </div>
  )
}
