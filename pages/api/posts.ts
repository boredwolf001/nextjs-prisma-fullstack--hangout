import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
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
  // if (req.method === 'POST') {
  //   req.body
  //   if (!req.body.title || !req.body.description) return res.status(400).json({message: 'Fields cannot be empty'})
  //   try {
  //     const createdPost = await prisma.post.create({data: {title: req.body.title, description: req.body.description}})
  //     res.status(200).json(allPosts)
  //   } catch (e) {
  //     res.status(500).json({ message: `Error occured: ${e}` })
  //   }
  // }
}
