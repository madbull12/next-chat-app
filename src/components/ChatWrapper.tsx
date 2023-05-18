"use client"

import React from 'react'

interface Props {
    children:React.ReactNode
}
const ChatWrapper = ({ children }:Props) => {
  return (
    <div className=' min-h-screen flex flex-col justify-between'>
        {children}
    </div>
  )
}

export default ChatWrapper