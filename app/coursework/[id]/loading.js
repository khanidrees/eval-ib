import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='flex w-full h-full justify-around'>
        <Skeleton className='w-6/12 h-[800px] bg-gray-400'/>
            
        
        <div className='w-3/12 h-[400px]  '>
            <Skeleton className='h-[100px] bg-gray-400 mb-2'/>
            <Skeleton className='h-[80px] bg-gray-400 mb-2'/>
            <Skeleton className='h-[80px] bg-gray-400 mb-2'/>
            <Skeleton className='h-[80px] bg-gray-400 mb-2'/>
        </div>
    </div>
  )
}

export default LoadingPage