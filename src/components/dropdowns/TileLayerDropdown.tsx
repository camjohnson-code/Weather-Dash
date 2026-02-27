import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.tsx';

type Props = {
  tileLayer: string;
  onTileLayerChange: (tileLayer: string) => void;
};

export default function TileLayerDropdown({ tileLayer, onTileLayerChange }: Props) {
  return (
    <Select value={tileLayer} onValueChange={onTileLayerChange}>
      <SelectTrigger className='w-45'>
        <SelectValue placeholder='Select map' />
      </SelectTrigger>
      <SelectContent className='z-1100'>
        {tileLayers.map((tileLayer) => (
          <SelectItem key={tileLayer} value={tileLayer} className='capitalize'>
            {tileLayer.split('_')[0]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const tileLayers: string[] = [
  'clouds_new',
  'precipitation_new',
  'pressure_new',
  'wind_new',
  'temp_new',
];
