import Sidebar from '@/components/Sidebar'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

interface LayoutProps {
    children:React.ReactNode
}

export const metadata = {
  title: 'Dashboard',
  description: 'discu Dashboard',
}
const DashboardLayout = async({ children }:LayoutProps) => {
  const session = await getServerSession(authOptions);

  if(!session) return null;
  
  
  return (
    <>
        <Sidebar />
        {children}
    </>
  )
}

export default DashboardLayout