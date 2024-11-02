'use server'

import prisma from '@/lib/prisma'

export const getStockBySlug = async(slug: string): Promise<number> => {
  try {
    const product = await prisma.product.findFirst({
      select: {
        inStock: true
      },
      where: { slug }
    })

    return product?.inStock ?? 0
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener stock por slug ' + slug)
  }
}