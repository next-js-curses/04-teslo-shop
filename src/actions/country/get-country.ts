'use server'

import type { Country } from '@/interfaces'
import prisma from '@/lib/prisma'

export const getCountries = async (): Promise<Country[]> => {
  try {
    const countries = prisma.country.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return countries
  } catch (error) {
    console.error(error)
    return []
  }
}