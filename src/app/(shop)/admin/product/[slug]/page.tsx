import { getCategories, getProductBySlug } from '@/actions';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: Readonly<Props>) {
  const { slug } = params

  const product = await getProductBySlug(slug)

  // TODO: new
  if (!product) {
    redirect('/admin/products')
  }

  const categories = await getCategories()

  const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto'

  return (
    <div>
      <Title title={ title } />
      <ProductForm product={ product } categories={ categories } />
    </div>
  );
}