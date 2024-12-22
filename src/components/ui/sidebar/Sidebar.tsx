'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { logout } from '@/actions'
import { useUIStore } from '@/store'
import clsx from 'clsx'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

export const Sidebar = () => {

  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
  const closeSideMenu = useUIStore(state => state.closeSideMenu)

  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const isAdmin = (session?.user.role === 'admin')

  const onLogout = async () => {
    closeSideMenu()
    await logout()
    window.location.replace('/')
  }

  return (
    <div>
      {/* Black background */}
      {
        isSideMenuOpen && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
          />
        )
      }

      {/* Blue */}
      {
        isSideMenuOpen && (
          <button
            onClick={ () => closeSideMenu() }
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />
        )
      }

      {/* Side menu */}
      <nav
        className={
          clsx(
            "fixed p-5 right-0 top-0 w-screen sm:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
            {
              "translate-x-full": !isSideMenuOpen
            }
          )
        }
      >
        <IoCloseOutline
          size={ 50 }
          className="absolute top-5 right-5 cursor-pointer"
          onClick={ () => closeSideMenu() }
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={ 20 } className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menú */}
        {
          !isAuthenticated && (
            <Link
              href="/auth/login"
              className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              onClick={() => closeSideMenu()}
            >
              <IoLogInOutline size={ 30 } />
              <span className="ml-3 text-xl">Ingresar</span>
            </Link>
          )
        }

        {
          isAuthenticated && (
            <>
              <Link
                href="/profile"
                onClick={() => closeSideMenu()}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPersonOutline size={ 30 } />
                <span className="ml-3 text-xl">Perfil</span>
              </Link>
              <Link
                href="/orders"
                onClick={() => closeSideMenu()}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={ 30 } />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>
              <button
                type="button"
                className="flex w-full items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
                onClick={() => onLogout()}
              >
                <IoLogOutOutline size={ 30 } />
                <span className="ml-3 text-xl">Salir</span>
              </button>
            </>
          )
        }

        {
          isAdmin && (
            <>
              {/* Line separator */}
              <div className="w-full h-px bg-gray-200 my-5" />

              <Link
                href="/"
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoShirtOutline size={ 30 } />
                <span className="ml-3 text-xl">Productos</span>
              </Link>
              <Link
                href="/admin/orders"
                onClick={() => closeSideMenu()}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoTicketOutline size={ 30 } />
                <span className="ml-3 text-xl">Ordenes</span>
              </Link>
              <Link
                href="/admin/users"
                onClick={() => closeSideMenu()}
                className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
              >
                <IoPeopleOutline size={ 30 } />
                <span className="ml-3 text-xl">Usuarios</span>
              </Link>
            </>
          )
        }
      </nav>

    </div>
  )
}
