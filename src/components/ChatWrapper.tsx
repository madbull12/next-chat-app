"use client"

import React from 'react'

interface Props {
    children:React.ReactNode
}
const ChatWrapper = ({ children }:Props) => {
  return (
    <div className=' min-h-screen p-2'>
        {children}
    </div>
  )
}

export default ChatWrapper