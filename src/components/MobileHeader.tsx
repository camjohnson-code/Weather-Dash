import type { Dispatch, SetStateAction } from 'react';
import Hamburger from '/src/assets/hamburger.svg?react';

type Props = {
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

export default function MobileHeader({ setIsSidePanelOpen }: Props) {
  return (
    <div className='w-full h-16 p-4 sticky top-0 bg-background z-1001 xs:hidden flex justify-end'>
      <button onClick={() => setIsSidePanelOpen(true)}>
        <Hamburger className='size-6 invert cursor-pointer ml-auto' />
      </button>
    </div>
  );
}
