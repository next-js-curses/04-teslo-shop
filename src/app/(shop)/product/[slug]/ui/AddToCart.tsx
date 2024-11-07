'use client'

import { useState } from 'react';
import { QuantitySelector, SizeSelector } from '@/components'
import type { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/store';

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size|undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const addProductToCart = useCartStore(state => state.addProductToCart)

  const addToCart = () => {
    setPosted(true)

    if (!size) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }
    addProductToCart(cartProduct)

    // reset
    setPosted(false)
    setQuantity(1)
    setSize(undefined)
  }

  return (
    <>
      {
        posted && !size && (
          <span className="mt-2 text-red-500 fade-in">
            Debe de seleccionar una talla*
          </span>
        )
      }

      {/* Selector de tallas */}
      <SizeSelector
        availableSizes={ product.sizes }
        selectedSize={ size }
        onSizeChanged={ setSize }
      />

      {/* Selector de cantidad */}
      <QuantitySelector
        quantity={ quantity }
        onQuantityChanged={ setQuantity }
      />

      {/* Botón */}
      <button
        className="btn-primary my-5"
        onClick={ addToCart }
      >
        Agregar al carrito
      </button>
    </>
  )
}