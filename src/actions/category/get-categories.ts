'use server'

import type { Category } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getCategories = async(): Promise<Category[]> => {
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