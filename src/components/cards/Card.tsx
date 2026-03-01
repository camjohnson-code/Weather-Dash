import clsx from 'clsx';
import React from 'react';

type Props = {
  children: React.ReactNode;
  title?: string;
  childrenClassName?: string;
  className?: string;
};

export default function Card({ children, title, childrenClassName, className }: Props) {
  return (
    <div
      className={clsx(
        'p-4 rounded-xl bg-linear-to-br from-card to-card/60 shadow-md flex flex-col gap-4 2xl:h-full border dark:border-none',
        className,
      )}
    >
      <h2 className='text-2xl font-semibold'>{title}</h2>
      <div className={clsx(childrenClassName, 'animate-[fade-in_1s_ease-out_forwards] 2xl:flex-1')}>
        {children}
      </div>
    </div>
  );
}
