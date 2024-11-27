'use client'

import { placeOrder } from '@/actions'
import { useAddressStore, useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export const PlaceOrder = () => {
  
  const [loaded, setLoaded] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const address = useAddressStore(state => state.address)
  const { itemsInCart, subTotal, tax, total } = useCartStore(
    state => state.getSummaryInformation()
  )

  const cart = useCartStore(state => state.cart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  if (!loaded) {
    return <p>Cargando...</p>
  }

  const onPlacingOrder = async() => {
    setIsPlacingOrder(true)

    const productsToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))

    const resp = await placeOrder(productsToOrder, address)
    console.log({ resp })

    setIsPlacingOrder(false)
  }

  return (
    <div className="bg-white rounded-xl p-7">
      <h2 className="text-2xl mb-2">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">{ address.firstName } { address.lastName }</p>
        <p>{ address.address }</p>
        <p>{ address.address2 }</p>
        <p>{ address.postalCode }</p>
        <p>{ address.city } { address.country }</p>
        <p>{ address.phone }</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>Nro. Productos</span>
        <span className="text-right">{ itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos` }</span>

        <span>Subtotal</span>
        <span className="text-right">{ currencyFormat(subTotal) }</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{ currencyFormat(tax) }</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">{ currencyFormat(total) }</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclamer */}
          <span className="text-xs">
            Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{' '}
            <span className="underline cursor-pointer">términos y condiciones</span> y <span className="underline cursor-pointer">política de privacidad</span>
          </span>
        </p>

        {/* <p className="text-sm text-red-500">Error de creación</p> */}

        <button
          disabled={ isPlacingOrder }
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disable": isPlacingOrder
          })}
          onClick={ onPlacingOrder }
        >
          Colocar orden
        </button>
      </div>
    </div>
  )
}