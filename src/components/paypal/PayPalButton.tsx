'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import type { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js'
import { setTransactionId } from '@/actions'

interface Props {
  orderId: string
  amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {

  const rountedAmount = (Math.round(amount * 100)) / 100

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
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          // invoice_id: 'order_id',
          amount: {
            value: `${ rountedAmount }`,
            currency_code: 'USD'
          }
        }
      ],
      intent: 'CAPTURE'
    })

    if (!transactionId) {
      throw new Error('No se pudo obtener transaction id de paypal')
    }

    const { ok } = await setTransactionId(orderId, transactionId)
    if (!ok) {
      throw new Error('No se pudo actualizar la orden')
    }

    return transactionId
  }

  return (
    <PayPalButtons
      createOrder={ createOrder }
      // onApprove={}
    />
  )
}