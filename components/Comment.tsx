import { Post, User } from '@prisma/client'

interface Comment {
  id: string
  createdAt: Date
  content: string
  replies: string[]
  userId: string
  postId: string
  user: User
  post: Post
}

const Comment = ({ comment }: { comment: Comment }) => (
  <div className='flex mb-4 w-96 p-4 bg-gray-100 rounded-md'>
    <img
      src={comment.user.image!}
      alt={comment.user.name!}
      className='h-12 rounded-full mr-3'
    />
    <div className='flex-grow w-fit bg-white p-3 rounded-lg shadow'>
      <p className='text-gray-700'>{comment.content}</p>
    </div>
  </div>
)

export default Comment
