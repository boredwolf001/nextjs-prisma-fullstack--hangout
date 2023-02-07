import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../auth/[...nextauth]'
import { Session } from 'next-auth'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session: Session | null = await getServerSession(req, res, authOptions)
  const postId: any = req.query.postId

  if (req.method === 'POST') {
    if (!session?.user) return res.status(401).json({ message: 'Unauthorized' })

    const { content }: { content: string } = JSON.parse(req.body)

    if (!content)
      return res.status(400).json({ message: 'Comment should not be empty' })

    const post = await prisma.post.findFirst({ where: { id: postId } })
    if (!post) return res.status(404).json({ message: 'No post with this ID' })
    try {
      const newComment = await prisma.comment.create({
        data: { postId: post.id, content, userId: session.user.id },
      })
      return res.status(201).json({
        message: 'Comment created successfully',
        comment: { user: session.user, ...newComment },
      })
    } catch (error) {
      res.status(500).json({ message: 'Error occured while updating the post' })
    }
  }
}
