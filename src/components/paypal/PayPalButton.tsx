'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

export const PayPalButton = () => {

  const [{ isPending }] = usePayPalScriptReducer()

  if (isPending) {
    return (
      <div className="animate-pulse mb-16">
        <div className="h-11 bg-gray-300 rounded"></div>
        <div className="h-11 bg-gray-300 rounded mt-4"></div>
      </div>
    )
  }

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    return ''
  }

  return (
    <PayPalButtons
      createOrder={}
      onApprove={}
    />
  )
}