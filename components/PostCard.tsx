import React from 'react'

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

const PostCard = ({ post }: { post: any }) => {
  console.log(post)
  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <div className='flex'>
        <img src={post.user.image} className='rounded-full h-12 w-12' />
        <div className='ml-4'>
          <h4 className='font-bold'>{post.user.name}</h4>
          <p className='text-gray-600'>{formatDate(post.ceratedAt)}</p>
        </div>
      </div>
      <p className='mt-4'>{post.description}</p>
      <div className='mt-4'>
        <img src={post.imageUrl} className='rounded-lg' />
      </div>
      <div className='flex justify-between mt-4'>
        <div className='flex items-center'>
          <i className='fas fa-thumbs-up text-blue-500 mr-2'></i>
          <p className='text-gray-600'>Like</p>
        </div>
        <div className='flex items-center'>
          <i className='fas fa-comment text-blue-500 mr-2'></i>
          <p className='text-gray-600'>Comment</p>
        </div>
        <div className='flex items-center'>
          <i className='fas fa-share text-blue-500 mr-2'></i>
          <p className='text-gray-600'>Share</p>
        </div>
      </div>
    </div>
  )
}

export default PostCard
