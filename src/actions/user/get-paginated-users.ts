'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getPaginatedUsers = async () => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe de estar autenticado y tener rol de administrador'
    }
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return {
      ok: true,
      orders: users
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'No se pudo obtener datos de usuario ' + session.user.id
    }
  }

}