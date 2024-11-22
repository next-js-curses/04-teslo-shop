import prisma from '../lib/prisma'
import { initialData } from './seed'
import { countries } from './seed-countries'

async function main() {
  // 1. Borrar registros previos
  await prisma.userAddress.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.user.deleteMany()
  await prisma.country.deleteMany()

  const { categories, products, users } = initialData

  // Categorias
  const categoriesData = categories.map(name => ({ name }))
  await prisma.category.createMany({ data: categoriesData })

  const categoriesDB = await prisma.category.findMany()
  
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id
    return map
  }, {} as Record<string, string>)

  // Product
  products.forEach(async(product) => {
    const { type, images, ...rest } = product
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type]
      }
    })

    // Images
    const imagesData = images.map(image => ({
      url: image,
      productId: dbProduct.id
    }))

    await prisma.productImage.createMany({
      data: imagesData
    })

  })

  // User
  await prisma.user.createMany({
    data: users
  })

  // Country
  await prisma.country.createMany({
    data: countries
  })

  console.log('Seed executed successfully!')
}

(() => {
  if (process.env.NODE_ENV === 'production') return
  main()
})()