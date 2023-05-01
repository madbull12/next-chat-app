import Sidebar from '@/components/Sidebar'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

interface LayoutProps {
    children:React.ReactNode
}

export const metadata = {
  title: 'Dashboard | discu',
  description: 'discu Dashboard',
}
const DashboardLayout = async({ children }:LayoutProps) => {
  const session = await getServerSession(authOptions);

  if(!session) return null;
  
  const unseenRequestCount = (
    (await fetchRedis(
      'smembers',
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length
  
  return (
    <>
        <Sidebar unseenRequest={unseenRequestCount} />
        {children}
    </>
  )
}

export default DashboardLayout