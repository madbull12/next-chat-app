import Sidebar from '@/components/Sidebar'
import { getFriendsByUserId } from '@/helpers/getFriendsByUserId'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
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
  const session = await getCurrentUser();

  if(!session) return null;
  
  const unseenRequestCount = (
    (await fetchRedis(
      'smembers',
      `user:${session.id}:incoming_friend_requests`
    )) as User[]
  ).length

  const friends = await getFriendsByUserId(session?.id as string);
  console.log(friends);
  
  return (
    <div className='flex relative w-full'>
        <Sidebar unseenRequest={unseenRequestCount} session={session as User} friends={friends} />
        
        {children}
    </div>
  )
}

export default DashboardLayout