import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const RequestsPage = async() => {
    const session = await getServerSession(authOptions);
    if (!session) return null;

    const incomingSenderIds = (await fetchRedis('smembers',`user:${session.user.id}:incoming_friend_requests`)) as string[];

    const incomingFriendRequests = await Promise.all(
        incomingSenderIds.map(async(senderId)=>{
            const sender = (await fetchRedis("get",`user:${senderId}`)) as User;
            return {
                senderId,
                senderEmail: sender.email,
              }
        })
    )
  return (
    <div>RequestsPage</div>
  )
}

export default RequestsPage