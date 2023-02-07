import { User } from '@prisma/client'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Comment from '../../components/Comment'
import CommentInput from '../../components/CommentInput'
import PostCard from '../../components/PostCard'

export async function getServerSideProps({
  query,
}: {
  query: { postId: string }
}) {
  const { postId } = query

  let post
  try {
    post = await fetch(`${process.env.BASE_URL}/api/posts/${postId}`).then(r =>
      r.json()
    )
    console.log(post)
  } catch (error) {
    console.log(error)
    throw error
  }
  return { props: { post: post } }
}

interface Post {
  id: string
  imageUrl: string
  description: string
  userId: string
  createdAt: Date
  comments: Comment[]
  likes: number
  user: User
}

const Post = ({ post }: { post: Post }) => {
  const [commentState, setCommentState] = useState<Comment[]>(post.comments)
  const newComment = async (content: string) => {
    let data: { message: string; comment: Comment }
    try {
      data = await fetch(`/api/posts/comment/${post.id}`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      }).then(r => r.json())
    } catch (error) {
      console.log(error)
      throw error
    }
    setCommentState(prevState => {
      return [data.comment, ...prevState]
    })
  }

  return (
    <div>
      <div className='m-8 relative p-4 my-3 w-fit bg-white rounded-lg shadow-md'>
        <div className='flex justify-between'>
          <div className='mb-6 flex items-center'>
            <img
              src={post.user.image!}
              alt={post.user.name!}
              className='w-10 h-10 rounded-full'
            />
            <div className='ml-2'>
              <p className='font-medium text-lg'>{post.user.name}</p>
            </div>
          </div>
        </div>
        <img
          src={post.imageUrl}
          className='max-w-96 max-h-96 object-cover rounded-md'
          alt=''
        />
        <p className='mt-2'>{post.description}</p>
      </div>

      {/* comments */}
      <div className='mt-6 ml-8 px-6 py-4'>
        <div className='text-2xl font-bold mb-2'>
          Comments -{' '}
          {commentState.reduce((a, b) => {
            return a + 1
          }, 0)}
        </div>
        {/* add comment */}
        <CommentInput onSubmit={newComment} />
        {commentState.length !== 0 ? (
          commentState.map(comment => <Comment comment={comment} />)
        ) : (
          <h1 className='text-xl mt-6 text-gray-400'>No Comments</h1>
        )}
      </div>
    </div>
  )
}

export default Post
