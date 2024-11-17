'use server'

import prisma from '@/lib/prisma'
import { Gender } from '@prisma/client'

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export const getPaginatedProductWithImages = async({
    page = 1, take = 12, gender
  }: PaginationOptions) => {
  
    if (isNaN(Number(page)) || Number(page) < 1) page = 1
    if (isNaN(Number(take))) take = 12
    
  try {
    // 1. Obtener los productos
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
      },
      where: {
        gender
      }
    })

    // 2. Obtener total de páginas
    const totalCount = await prisma.product.count({ where: { gender } })
    const totalPages = Math.ceil(totalCount / take)

    return {
      totalPages: totalPages,
      products: products.map(product => ({
        ...product,
        images: product.ProductImage.map(image => image.url)
      }))
    }
  } catch (error) {
    throw new Error('No se pudo cargar los productos ', { cause: error })
  }
}