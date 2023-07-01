import Sidebar from '@/components/Sidebar'
import { getFriendsByUserId } from '@/helpers/getFriendsByUserId'
import { getIncomingFriendRequests } from '@/helpers/getIncomingFriendRequests'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'

interface LayoutProps {
    children:React.ReactNode
}

export const metadata = {
  title: 'Dashboard | discu',
  description: 'discu Dashboard',
}
const DashboardLayout = async({ children }:LayoutProps) => {
  const incomingFriendRequests = await getIncomingFriendRequests();
  const session = await getCurrentUser();

  if (!session) notFound();

  const friends = await getFriendsByUserId(session?.id)
  console.log('friends', friends)
  return (
    <div className='flex relative w-full'>
        <Sidebar unseenRequest={incomingFriendRequests as IncomingFriendRequest[]} session={session as User} friends={friends} />
        
        {children}
    </div>
  )
}

export default DashboardLayout