import { Suspense, useState } from 'react';
import DailyForecast from './components/cards/DailyForecast.tsx';
import HourlyForecast from './components/cards/HourlyForecast.tsx';
import CurrentWeather from './components/cards/CurrentWeather.tsx';
import AdditionalInfo from './components/cards/AdditionalInfo.tsx';
import Map from './components/Map.tsx';
import type { Coords } from './types.ts';
import LocationDropdown from './components/dropdowns/LocationDropdown.tsx';
import { branches } from './data/branches.ts';
import TileLayerDropdown from './components/dropdowns/TileLayerDropdown.tsx';
import CurrentWeatherSkeleton from './components/skeletons/CurrentSkeleton.tsx';
import DailyForecastSkeleton from './components/skeletons/DailySkeleton.tsx';
import HourlyForecastSkeleton from './components/skeletons/HourlySkeleton.tsx';
import AdditionalInfoSkeleton from './components/skeletons/AdditionalInfoSkeleton.tsx';
import SidePanel from './components/SidePanel.tsx';
import Hamburger from '/src/assets/hamburger.svg?react';

function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 39.5524682, lon: -104.8736162 });
  const [tileLayer, setTileLayer] = useState<string>('clouds_new');
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(true);

  const onMapClick = (lat: number, lon: number): void => {
    setCoords({ lat, lon });
  };

  const onLocationChange = (location: string): void => {
    const branch = branches.find((b) => b.name === location);

    if (branch) setCoords({ lat: branch.lat, lon: branch.lon });
  };

  const selectedBranch = branches.find((b) => b.lat === coords.lat && b.lon === coords.lon);

  return (
    <>
      <div className='flex flex-col gap-8'>
        <div className='flex gap-4'>
          <div className='flex gap-2 items-center'>
            <h2 className='font-semibold text-xl'>Location</h2>
            <LocationDropdown value={selectedBranch?.name} onLocationChange={onLocationChange} />
          </div>
          <div className='flex gap-2 items-center'>
            <h2 className='font-semibold text-xl'>Map Type</h2>
            <TileLayerDropdown tileLayer={tileLayer} onTileLayerChange={setTileLayer} />
          </div>
          <button onClick={() => setIsSidePanelOpen(true)}>
            <Hamburger className='size-8 invert cursor-pointer ml-auto' />
          </button>
        </div>
        <Map coords={coords} onMapClick={onMapClick} tileLayer={tileLayer} />
        <Suspense fallback={<CurrentWeatherSkeleton />}>
          <CurrentWeather coords={coords} />
        </Suspense>
        <Suspense fallback={<HourlyForecastSkeleton />}>
          <HourlyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<DailyForecastSkeleton />}>
          <DailyForecast coords={coords} />
        </Suspense>
        <Suspense fallback={<AdditionalInfoSkeleton />}>
          <AdditionalInfo coords={coords} />
        </Suspense>
      </div>
      <SidePanel
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
        coords={coords}
      />
    </>
  );
}

export default App;
