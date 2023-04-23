import Sidebar from '@/components/Sidebar'
import React from 'react'

interface LayoutProps {
    children:React.ReactNode
}

export const metadata = {
  title: 'Dashboard',
  description: 'discu Dashboard',
}
const LayoutPage:React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
        <Sidebar />
        {children}
    </>
  )
}

export default LayoutPage