import { Skeleton } from '@/components/ui/Skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className='space-y-4 ml-[25%] p-4 w-full'>
        <Skeleton className="w-1/4 h-[40px] " />
        <Skeleton className="w-1/2 h-[20px] " />
        <div className='flex items-center gap-x-2 w-1/2 '>
            <Skeleton className="w-3/4 h-[25px] " />
            <Skeleton className="w-1/4 h-[25px] " />
        </div>

    </div>
  )
}

export default Loading