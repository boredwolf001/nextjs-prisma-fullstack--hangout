import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { Session } from 'next-auth'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: Session | null = await getServerSession(req, res, authOptions)
  const postId: any = req.query.postId

  if (req.method === 'GET') {
    try {
      const post = await prisma.post.findFirst({ where: { id: postId } })
      if (!post)
        return res.status(404).json({ message: 'Post not found with this ID' })

      return res.status(200).json(post)
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occured while fetching the post' })
    }
  }

  if (req.method === 'DELETE') {
    if (!session?.user) return res.status(401).json({ message: 'Unauthorized' })

    const post = await prisma.post.findFirst({ where: { id: postId } })
    if (post?.userId !== session.user.id)
      return res.status(401).json({ message: 'No access' })

    try {
      await prisma.post.delete({ where: { id: postId } })
      res.status(200).json({})
    } catch (error) {
      res.status(500).json({ message: 'Error occured while deleting the post' })
    }
  }
}
