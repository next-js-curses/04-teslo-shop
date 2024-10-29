export const revalidate = 60 // 60 seconds

import { getPaginatedProductWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { Gender } from '@prisma/client'
import { notFound, redirect } from 'next/navigation'

interface Props {
  params: {
    gender: Gender
  },
  searchParams: {
    page?: string
  }
}

const allowedGenres: string[] = [ 'men', 'women', 'kid' ]

const labels: Record<Gender, string> = {
  'men': 'hombres',
  'women': 'mujeres',
  'kid': 'niños',
  'unisex': 'todos'
}

export default async function Category({ params, searchParams }: Readonly<Props>) {
  const { gender } = params

  if (!allowedGenres.includes(gender)) notFound()

  const page = searchParams.page
    ? parseInt(searchParams.page)
    : 1;

  const { products, totalPages } = await getPaginatedProductWithImages({ page, gender })

  if (products.length === 0) redirect(`/gender/${gender}`)

  return (
    <>
      <Title
        title={ `Articulos para ${labels[gender]}` }
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={ products } />

      <Pagination totalPages={ totalPages } />
    </>
  );
}
