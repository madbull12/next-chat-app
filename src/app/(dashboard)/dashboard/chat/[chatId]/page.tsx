import ChatWrapper from '@/components/ChatWrapper'
import { useRouter } from 'next/navigation'
import React from 'react'


interface PageProps {
    params: {
      chatId: string
    }
  }
const ChatMessagesPage = ({ params }:PageProps) => {

  return (
    <ChatWrapper>
        {params.chatId}
    </ChatWrapper>
  )
}

export default ChatMessagesPage