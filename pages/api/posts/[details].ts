// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 if(req.method === 'GET') {
     // get post
        try {
            console.log(req.query)
            const data = await prisma.post.findUnique({
                where: {
                    id: req.query.details
                },
                include: {
                    user: true,
                    Comment: {
                        orderBy: {
                            createdAt: 'desc',
                        },
                        include: {
                            user: true,
                        },
                    },
                },
            })
            return res.status(200).json(data)
            res.status(200).json(data)
        } catch (error) {
            res.status(403).json({error: 'Error has occurred'})

        }
    }
}
