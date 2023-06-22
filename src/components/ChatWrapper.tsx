"use client"

import React from 'react'

interface Props {
    children:React.ReactNode
}
const ChatWrapper = ({ children }:Props) => {
  return (
    <div className=' min-h-screen  flex flex-col justify-between ml-[25%] w-full'>
        {children}
    </div>
  )
}

export default ChatWrapper