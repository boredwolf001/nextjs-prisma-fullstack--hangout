import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { Session } from 'next-auth'
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const allPosts = await prisma.post.findMany()
      res.status(200).json(allPosts)
    } catch (e) {
      res.status(500).json({ message: `Error occured: ${e}` })
    }
  }
  if (req.method === 'POST') {
    const session: Session | null = await getServerSession(
      req,
      res,
      authOptions
    )

    // If user is not logged in
    if (!session?.user) return res.status(401).json({ message: 'Unauthorized' })

    // check whether body is not empty
    const body = JSON.parse(req.body)
    if (!body.title || !body.description)
      return res.status(400).json({ message: 'Fields cannot be empty' })

    try {
      const createdPost = await prisma.post.create({
        data: {
          title: body.title,
          description: body.description,
          userId: session.user.id,
        },
      })
      res.status(201).json({ message: 'Post created', post: createdPost })
    } catch (error) {
      res.status(500).json({ message: `An error occured: ${error}` })
    }
  }
}
