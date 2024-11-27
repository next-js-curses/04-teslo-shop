'use server'

import { auth } from '@/auth.config'
import type { Address, Size } from '@/interfaces'
import prisma from '@/lib/prisma'

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async(productIds: ProductToOrder[], address: Address) => {

  const session = await auth()
  const userId = session?.user.id

  // Verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: 'No hay sesión de usuario'
    }
  }

  // Obtener info de productos
  // Nota: puede haber 2+ productos con el mismo ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map(product => product.productId)
      }
    }
  })

  return {
    ok: true
  }

}