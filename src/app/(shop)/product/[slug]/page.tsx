export const revalidate = 604800 // 7 días

import { getProductBySlug } from '@/actions'
import { ProductMobleSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from '@/components'
import { titleFont } from '@/config/fonts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = params

  const product = await getProductBySlug(slug)
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${ product?.images[1] }`],
    },
  }
}

interface Props {
  params: {
    slug: string
  }
}

export default async function Product({ params }: Readonly<Props>) {
  const { slug } = params

  const product = await getProductBySlug(slug)

  if (!product) notFound()

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile slideshow */}
        <ProductMobleSlideshow
          title={ product.title }
          images={ product.images }
          className="block md:hidden"
        />

        {/* Desktop slideshow */}
        <ProductSlideshow
          title={ product.title }
          images={ product.images }
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <StockLabel slug={ product.slug } />
        
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          { product.title }
        </h1>
        <p className="text-lg mb-5">${ product.price }</p>

        {/* Selector de tallas */}
        <SizeSelector
          availableSizes={ product.sizes }
          selectedSize={ product.sizes[0] }
        />

        {/* Selector de cantidad */}
        <QuantitySelector quantity={ 0 } />

        {/* Botón */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{ product.description }</p>
      </div>
    </div>
  );
}
