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
  if (req.method === 'GET') {
    try {
      const allPosts = await prisma.post.findMany()
      const allPostsWithUser = await Promise.all(
        allPosts.map(async post => {
          const user = await prisma.user.findFirst({
            where: { id: post.userId },
          })
          return { user, ...post }
        })
      )
      console.log(allPostsWithUser)
      res.status(200).json(allPostsWithUser)
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

    const postData = JSON.parse(req.body)

    if (!postData.description || !postData.imageUrl)
      return res.status(400).json({ message: 'Fields cannot be empty' })

    try {
      const newPost = await prisma.post.create({
        data: {
          description: postData.description,
          imageUrl: postData.imageUrl,
          userId: session.user.id,
        },
      })
      res.status(201).json(newPost)
    } catch (error) {
      res
        .status(500)
        .json({ message: `An error occured while creating the post: ${error}` })
      throw error
    }
  }
}
