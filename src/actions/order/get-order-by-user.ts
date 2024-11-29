'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getOrderByUser = async () => {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    })
    return {
      ok: true,
      orders
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'No se pudo obtener datos de ordenes de usuario ' + session.user.id
    }
  }

}