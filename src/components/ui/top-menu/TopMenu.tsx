'use client'

import { titleFont } from '@/config/fonts'
import { useUIStore } from '@/store'
import Link from 'next/link'
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5'
import { useCartStore } from '../../../store/cart/cart-store';
import { useEffect, useState } from 'react'

export const TopMenu = () => {

  const openSideMenu = useUIStore(state => state.openSideMenu)
  const totalItemsInCart = useCartStore(state => state.getTotalItems())

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])
  

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link
          href="/">
            <span className={`${ titleFont.className } antialiased font-bold`}>Teslo</span>
            <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        <Link href="/gender/men" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Hombres
        </Link>
        <Link href="/gender/women" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Mujeres
        </Link>
        <Link href="/gender/kid" className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
          Niños
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>
        <Link href={
          ((totalItemsInCart === 0) && isLoaded)
            ? '/empty'
            : '/cart'
        } className="mx-2">
          <div className="relative">
            {
              (isLoaded && totalItemsInCart > 0) && (
                <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">
                  { totalItemsInCart }
                </span>
              )
            }
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>
        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={ () => openSideMenu() }
        >
          Menú
        </button>
      </div>
    </nav>
  )
}
