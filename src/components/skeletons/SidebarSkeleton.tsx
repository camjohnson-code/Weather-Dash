import React from 'react';
import Card from '../cards/Card';
import { Skeleton } from '../ui/skeleton';

type Props = {};

export default function SidebarSkeleton({}: Props) {
  return (
    <div>
      <Card
        className='hover:scale-105 duration-300 transition-transform from-sidebar-accent to-sidebar-accent/60 gap-0!'
        childrenClassName='flex flex-col gap-3'
      >
        <div className='flex justify-between'>
          <Skeleton className='h-7 w-12 bg-sidebar' />
          <Skeleton className='h-7 w-12 bg-sidebar' />
        </div>
        <Skeleton className='w-full h-1.5 bg-sidebar' />
        <div className='flex justify-between text-sx'>
          <Skeleton className='h-4 w-2 bg-sidebar' />
          <Skeleton className='h-4 w-2 bg-sidebar' />
        </div>
        <div className='flex justify-between'>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className='h-6 w-15 bg-sidebar' />
          ))}
        </div>
      </Card>
    </div>
  );
}
