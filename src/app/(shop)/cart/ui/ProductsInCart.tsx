'use client'

import { useEffect, useState } from 'react'
import { ProductImage, QuantitySelector } from '@/components'
import { useCartStore } from '@/store'
import Link from 'next/link'

export const ProductsInCart = () => {
  const [loaded, setLoaded] = useState(false)
  const cartProducts = useCartStore(state => state.cart)
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
  const removeProduct = useCartStore(state => state.removeProduct)

  useEffect(() => {
    setLoaded(true)
  }, [])
  

  if (!loaded) {
    return <p>Cargando...</p>
  }

  return (
    <>
      {
        cartProducts.map(product => (
          <div key={`${product.slug}-${product.size}`} className="flex mb-5">
            <ProductImage
              src={ product.image }
              width={100}
              height={100}
              style={{
                width: '100px',
                height: '100px'
              }}
              alt={product.title}
              className="mr-5 rounded"
            />
            <div>
              <Link
                href={`/product/${product.slug}`}
                className="cursor-pointer hover:underline"
              >
                {`${product.size} - ${product.title}`}
              </Link>
              <p>${product.price}</p>
              <QuantitySelector
                quantity={ product.quantity }
                onQuantityChanged={ quantity => updateProductQuantity(product, quantity) }
              />
              <button
                className="underline mt-3"
                onClick={() => removeProduct(product)}
              >
                Remover
              </button>
            </div>
          </div>
        ))
      }
    </>
  )
}