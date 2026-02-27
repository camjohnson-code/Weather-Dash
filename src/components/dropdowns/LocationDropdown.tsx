import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { branches } from '../../data/branches.ts';

type Props = {
  value?: string;
  onLocationChange?: (location: string) => void;
};

export default function LocationDropdown({ value, onLocationChange }: Props) {
  return (
    <Select value={value} onValueChange={onLocationChange}>
      <SelectTrigger className='w-45'>
        <SelectValue placeholder='Select branch' />
      </SelectTrigger>
      <SelectContent className='z-1100'>
        {branches.map((branch) => (
          <SelectItem key={branch.name} value={branch.name}>
            {branch.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
