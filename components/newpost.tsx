import { getServerSession } from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { Session } from 'next-auth'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import prisma from '../lib/prismadb'

export default function NewPost({
  className,
  createPost,
  loading,
}: {
  className: string
  createPost: any
  loading: boolean
}) {
  const [image, setImage] = useState(null)
  const [desc, setDesc] = useState('')
  const { data: session }: { data: Session | null } = useSession()

  const createNewPost = async () => {
    // check if user is not logged in
    if (!session?.user) return toast.error('Log In to create a post')

    const formData = new FormData()

    formData.append('file', image)
    formData.append('upload_preset', 'hang-out-uploads')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/manethye/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    )
    const uploadedImageData: any = await res.json()

    createPost({ secure_url: uploadedImageData.secure_url, desc })
    setDesc('')
  }

  return (
    <div className={className}>
      <div className='bg-white p-4 rounded-lg shadow-md'>
        <textarea
          value={desc}
          onChange={e => setDesc(e.target.value)}
          className='resize-none w-full p-2 border border-gray-400 rounded-lg'
          placeholder="What's on your mind?"></textarea>
        <div className='flex justify-between mt-4'>
          <label className='bg-gray-300 p-2 rounded-lg text-gray-700 hover:bg-gray-400 cursor-pointer'>
            Add Photo
            <input
              onChange={(e: any) => {
                setImage(e.target.files[0])
              }}
              type='file'
              className='hidden'
            />
          </label>
          <button
            onClick={createNewPost}
            className='bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-600 disabled:cursor-progress disabled:bg-blue-400'
            disabled={loading}>
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
