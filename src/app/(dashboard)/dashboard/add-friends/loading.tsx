import { Skeleton } from '@/components/ui/Skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div>
        <Skeleton className="w-[100px] h-[20px] " />
        <Skeleton className="w-[100px] h-[20px] " />
        <div className='flex items-center gap-x-2'>
            <Skeleton className="w-[75px] h-[25px] " />
        </div>

    </div>
  )
}

export default Loading