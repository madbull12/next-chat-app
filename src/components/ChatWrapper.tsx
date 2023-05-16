"use client"

import React from 'react'

interface Props {
    children:React.ReactNode
}
const ChatWrapper = ({ children }:Props) => {
  return (
    <div className=' min-h-screen '>
        {children}
    </div>
  )
}

export default ChatWrapper