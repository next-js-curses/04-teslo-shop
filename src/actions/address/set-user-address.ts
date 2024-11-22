'use server'

import prisma from '@/lib/prisma'
import type { Address } from '@/interfaces'

export const setUserAddress = async(address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId)

    return {
      ok: true,
      address: newAddress
    }
  } catch (error) {
    console.error(error)
    return {
      ok: false,
      message: 'No se pudo grabar la dirección'
    }
  }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: { userId }
    })

    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
      city: address.city
    }

    if (!storeAddress) {
      const addressNew = await prisma.userAddress.create({
        data: addressToSave
      })
      return addressNew;
    }

    const addressUpdated = await prisma.userAddress.update({
      data: addressToSave,
      where: { id: storeAddress.id }
    })

    return addressUpdated

  } catch (error) {
    console.error(error)
    throw new Error('No se pudo grabar la dirección')
  }
}