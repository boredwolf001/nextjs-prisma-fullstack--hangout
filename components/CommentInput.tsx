import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

interface CommentInputProps {
  onSubmit: (content: string) => void
}

const CommentInput: React.FC<CommentInputProps> = ({ onSubmit }) => {
  const { data: session }: { data: Session | null } = useSession()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true)
    event.preventDefault()
    onSubmit(content)
    setContent('')
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className='flex gap-2 w-auto mt-4 mb-8'>
      <img
        src={session?.user?.image!}
        alt='User Avatar'
        className='w-12 h-12 rounded-full mr-3'
      />
      <input
        type='text'
        value={content}
        onChange={event => setContent(event.target.value)}
        className='flex-grow p-3 rounded-lg bg-gray-200'
        placeholder='Add a comment...'
      />
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed'
        disabled={loading}>
        {loading ? 'Commenting' : 'Comment'}
      </button>
    </form>
  )
}

export default CommentInput
