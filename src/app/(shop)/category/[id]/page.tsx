import { ProductGrid, Title } from '@/components'
import { initialData, type Category } from '@/seed/seed'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: Category
  }
}

const allowedGenres: string[] = [ 'men', 'women', 'kid' ]

const seedProducts = initialData.products

const labels: Record<Category, string> = {
  'men': 'hombres',
  'women': 'mujeres',
  'kid': 'niños',
  'unisex': 'todos'
}

export default function Category({ params }: Readonly<Props>) {
  const { id } = params

  if (!allowedGenres.includes(id)) notFound()

  const products = seedProducts.filter(product => product.gender === id)

  return (
    <>
      <Title
        title={ `Articulos para ${labels[id]}` }
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={ products } />
    </>
  );
}
