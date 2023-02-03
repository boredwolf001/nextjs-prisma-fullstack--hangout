import { getServerSession } from 'next-auth/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from './api/auth/[...nextauth]'
import { signIn } from 'next-auth/react'
import { Session } from 'next-auth'
import { useEffect } from 'react'

export async function getServerSideProps({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  const session: Session | null = await getServerSession(req, res, authOptions)

  if (session?.user)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {},
  }
}

export default function Component() {
  useEffect(() => {
    signIn()
  }, [])

  return <></>
}
