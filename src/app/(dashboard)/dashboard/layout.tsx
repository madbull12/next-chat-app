import Sidebar from '@/components/Sidebar'
import React from 'react'

interface LayoutProps {
    children:React.ReactNode
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