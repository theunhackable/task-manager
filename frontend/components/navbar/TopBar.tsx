"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { usePathname, useRouter } from 'next/navigation'

const TopBar = () => {
  const [loggendIn, setLoggedIn] = useState(false)
  const router = useRouter()
  const path = usePathname()
  useEffect(() => {
    if(typeof window !== "undefined") {
        const token = localStorage.getItem('token')
        if (token) setLoggedIn(prev => true)
        else 
        setLoggedIn(prev => false)
    }
    console.log(loggendIn)
  }, [loggendIn, path])
  const signOut = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    setLoggedIn(prev => false)
    router.push('/signin')
  }
  return (
    <div className='sticky top-0 z-50 bg-gray-200 px-4 md:px-16 py-2 md:py-4'>
      <div className='flex items-center justify-between'>
      <header>
        <h1 className='text-2xl font-bold'>
          Task Manager
        </h1>
      </header>
      <div>
          {loggendIn === true ? (
            <Button onClick={signOut} variant='link'>Sign Out</Button>
          ) : (
            <div className='flex items-center gap-5'>
              <Link className='hover:underline text-sm font-medium' href='/signin' > Sign In </Link>
              <Link className='hover:underline text-sm font-medium' href='/signup' > Sign Up </Link>
            </div>

          )}
      </div>
      </div>
    </div>
  )
}

export default TopBar