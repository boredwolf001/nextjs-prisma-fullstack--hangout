import type { NextApiRequest, NextApiResponse, NextPage } from 'next'
import { Post } from '@prisma/client'
import NewPost from '../components/newpost'
import PostCard from '../components/PostCard'

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  const posts = await fetch(`${process.env.BASE_URL}/api/posts`).then(r =>
    r.json()
  )
  return {
    props: { posts },
  }
}

const Home = ({ posts }: { posts: Post[] }) => {
  return (
    <div className='max-w-xl mt-10 mx-10'>
      <NewPost className='mb-6' />
      {posts.map(post => (
        <PostCard post={post} />
      ))}
    </div>
  )
}

export default Home
