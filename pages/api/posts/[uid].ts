import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prismadb'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { Session } from 'next-auth'
import { Post, User } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.query
  const session: Session | null = await getServerSession(req, res, authOptions)

  // If user is not logged in
  if (!session?.user) return res.status(401).json({ message: 'Unauthorized' })

  // Check if method is 'GET'
  if (req.method === 'GET') {
    // Check if the user exists
    try {
      const user: User | null = await prisma.user.findFirst({
        where: { id: uid },
      })
      if (!user) return res.status(404).json({ message: 'User not found' })

      const userPosts: Post[] = await prisma.post.findMany({
        where: { user: user },
      })

      console.log(user, userPosts)

      return res.status(200).json({ posts: userPosts, user })
    } catch (error) {
      return res.status(500).json({ message: `An error occured ${error}` })
    }
  }
}
