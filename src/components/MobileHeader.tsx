import type { Dispatch, SetStateAction } from 'react';
import Hamburger from '/src/assets/hamburger.svg?react';
import ThemeToggle from './ThemeToggle';

type Props = {
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MobileHeader({ setIsSidePanelOpen }: Props) {
  return (
    <div className='w-full h-16 p-4 sticky top-0 bg-background z-1001 xs:hidden flex gap-8 justify-end'>
      <ThemeToggle />
      <button onClick={() => setIsSidePanelOpen(true)}>
        <Hamburger className='size-6 cursor-pointer ml-auto' />
      </button>
    </div>
  );
}
