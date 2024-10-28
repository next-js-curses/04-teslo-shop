'use server'

import prisma from '@/lib/prisma'

interface PaginationOptions {
  page?: number
  take?: number
}

export const getPaginatedProductWithImages = async({
    page = 1, take = 12
  }: PaginationOptions) => {
  
    if (isNaN(Number(page)) || Number(page) < 1) page = 1
    if (isNaN(Number(take))) take = 12
    
  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      }
    })
    return {
      currentPage: 1,
      totalPages: 10,
      products: products.map(product => ({
        ...product,
        images: product.ProductImage.map(image => image.url)
      }))
    }
  } catch (error) {
    throw new Error('No se pudo cargar los productos ', { cause: error })
  }
}