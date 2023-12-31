import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopBar from '@/components/navbar/TopBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'Manage your tasks.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} >

        <TopBar />
        

        {children}
      </body>
    </html>
  )
}
