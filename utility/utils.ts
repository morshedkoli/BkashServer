import { PrismaClient } from '@prisma/client';
import { cache } from 'react'
 

const prisma = new PrismaClient();

export const getUsers = cache(async () => {
  const item = await prisma.user.findMany()
  return item
})


export const getUser = cache(async (id: string) => {
  const item = await prisma.user.findUnique({ 
    where: { id:id },
    include: {
      transections: true,
      recharges: true,
    }
  })
  return item
})