import { getServerSession } from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

export default function NewPost({
  className,
  createPost,
  loading,
  isEditing,
  currentEditingPost,
  editPost,
}: {
  className: string
  createPost: any
  loading: boolean
  isEditing: boolean
  currentEditingPost: any
  editPost: Function
}) {
  const [image, setImage] = useState(null)
  const [desc, setDesc] = useState('')
  const [imageUrlForPrev, setImageUrlForPrev] = useState('')
  const { data: session }: { data: Session | null } = useSession()

  useEffect(() => {
    setDesc(currentEditingPost.description)
  }, [isEditing])

  const uploadImage = async () => {
    // check if user is not logged in
    if (!session?.user) return toast.error('Log In to create or edit a post')

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

    if (isEditing) {
      editPost({ description: desc, imageUrl: uploadedImageData.secure_url })
    } else {
      createPost({ secure_url: uploadedImageData.secure_url, desc })
    }
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
        {imageUrlForPrev && (
          <img
            src={imageUrlForPrev}
            alt='Preview'
            className='max-w-md object-cover m-6 rounded-md shadow-md bg-blue-50'
          />
        )}
        <div className='flex justify-between mt-4'>
          <label className='bg-gray-300 py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-400 cursor-pointer'>
            Add Photo
            <input
              onChange={(e: any) => {
                setImageUrlForPrev(URL.createObjectURL(e.target.files[0]))
                setImage(e.target.files[0])
              }}
              type='file'
              className='hidden'
            />
          </label>

          <button
            onClick={uploadImage}
            className='bg-blue-500 py-2 px-4 rounded-lg text-white hover:bg-blue-600 disabled:cursor-progress disabled:bg-blue-400'
            disabled={loading}>
            {isEditing ? 'Edit' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  )
}
