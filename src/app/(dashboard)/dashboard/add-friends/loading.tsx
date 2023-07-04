import { Skeleton } from '@/components/ui/Skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className='space-y-4'>
        <Skeleton className="w-[50px] h-[40px] " />
        <Skeleton className="w-[100px] h-[20px] " />
        <div className='flex items-center gap-x-2 w-[100px]'>
            <Skeleton className="w-3/4 h-[25px] " />
            <Skeleton className="w-1/4 h-[25px] " />
        </div>

    </div>
  )
}

export default Loading