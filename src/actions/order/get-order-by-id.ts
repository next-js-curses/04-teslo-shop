'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getOrderById = async(id: string) => {
  const session = await auth()
  if (!session?.user) {
    return {
      ok: false,
      message: 'No hay sesión de usuario'
    }
  }

  try {
    const order = await prisma.order.findFirst({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: { url: true },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if (!order) throw new Error(`Orden con ID ${id} no existe`)

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw new Error(`Orden con ID ${id} no pertenece al usuario autenticado`)
      }
    }

    return {
      ok: true,
      order
    }
  } catch (error: any) {
    console.error(error)
    return {
      ok: false,
      message: error.message ?? 'No se pudo obtener datos de la orden'
    }
  }
}