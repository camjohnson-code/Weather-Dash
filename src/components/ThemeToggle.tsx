import Sun from '/src/assets/sun.svg?react';
import Moon from '/src/assets/moon.svg?react';
import { Switch } from './ui/switch';
import { useTheme } from './ThemeProvider';

type Props = {};

export default function ThemeToggle({}: Props) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='flex gap-2 items-center'>
      <Sun className='size-5' />
      <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} className='cursor-pointer' />
      <Moon className='size-5' />
    </div>
  );
}
