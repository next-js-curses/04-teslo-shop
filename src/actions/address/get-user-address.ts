'use server'

import type { Address } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getUserAddress = async (userId: string): Promise<Address|null> => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: { userId }
    })

    if (!storeAddress) return null

    const { countryId, address2, ...rest } = storeAddress

    return {
      ...rest,
      country: countryId,
      address2: address2 ?? undefined
    }
  } catch (error) {
    console.error(error)
    return null
  }
}