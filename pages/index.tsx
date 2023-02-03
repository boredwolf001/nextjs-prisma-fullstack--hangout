import type { NextApiRequest, NextApiResponse, NextPage } from 'next'
import { getServerSession, Session } from 'next-auth'
import { signOut, useSession } from 'next-auth/react'
import { authOptions } from './api/auth/[...nextauth]'

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

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <div className='mx-64 my-10'>
      <h1 className='text-6xl font-bold mx-auto my-auto'>Hang-Out</h1>
      <small className='text-2xl'>
        Logged In as {session?.user?.email}
      </small>{' '}
      <br />
      <button
        className='btn-primary py-2 px-4 rounded-md font-medium hover: shadow-md mt-4'
        onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  )
}

export default Home
