'use server'

import type { Gender } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getCategories = async(): Promise<Gender[]> => {
  try {
    return await prisma.category.findMany({
      orderBy:{
        name: 'asc'
      }
    })
  } catch (error) {
    console.error('Error in getCategories', error)
    return []
  }
}