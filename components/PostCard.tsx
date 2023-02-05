import { Session } from 'next-auth'
import React, { useState } from 'react'

function formatDate(date: any) {
  const now: Date = new Date()
  const newDate: Date = new Date(date)
  const timeDiff = now.getTime() - newDate.getTime()
  const hours = Math.floor(timeDiff / (1000 * 60 * 60))

  if (hours < 1) {
    return 'Less than 1 hour ago'
  }

  return `${hours} hours ago`
}

const PostCard = ({
  post,
  session,
  deletePost,
  setIsEditing,
  setCurrentEditingPost,
}: {
  post: any
  session: Session | null
  deletePost: any
  setIsEditing: Function
  setCurrentEditingPost: Function
}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className='relative p-4 my-3 bg-white rounded-lg shadow-md'>
      <div className='flex justify-between'>
        <div className='mb-6 flex items-center'>
          <img
            src={post.user.image}
            alt={post.user.name}
            className='w-10 h-10 rounded-full'
          />
          <div className='ml-2'>
            <p className='font-medium text-lg'>{post.user.name}</p>
            <p className='text-gray-500 text-sm'>
              {formatDate(post.ceratedAt)}
            </p>
          </div>
        </div>
        {post.user.id === session?.user?.id && (
          <button
            className='py-1 px-4 rounded-md hover:bg-gray-200 text-gray-600 hover:text-gray-800 z-10'
            onClick={() => setShowDropdown(!showDropdown)}>
            &#8942;
          </button>
        )}
      </div>
      <img
        src={post.imageUrl}
        className='max-w-96 max-h-96 object-cover rounded-md'
        alt=''
      />
      <p className='mt-2'>{post.description}</p>
      {showDropdown && (
        <div className='absolute top-20 right-0 mt-2 py-2 bg-white rounded-lg shadow-md'>
          <button
            className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            onClick={() => {
              setIsEditing(true)
              setCurrentEditingPost(post)
            }}>
            Edit
          </button>
          <button
            className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
            onClick={() => deletePost(post.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

export default PostCard
