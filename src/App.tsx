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
import MobileHeader from './components/MobileHeader.tsx';
import ThemeToggle from './components/ThemeToggle.tsx';

function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 39.5524682, lon: -104.8736162 });
  const [tileLayer, setTileLayer] = useState<string>('clouds_new');
  const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

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
      <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />
      <div className='flex flex-col pt-4 p-8 xs:pt-8 gap-8 w-full lg:w-[calc(100dvw_-_var(--sidebar-width))] 2xl:h-screen'>
        <div className='flex flex-col gap-4 xs:flex-row xs:gap-8'>
          <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
            <h2 className='font-semibold text-xl'>Location</h2>
            <LocationDropdown value={selectedBranch?.name} onLocationChange={onLocationChange} />
          </div>
          <div className='flex flex-col md:flex-row gap-2 md:gap-4'>
            <h2 className='font-semibold text-xl whitespace-nowrap'>Map Type</h2>
            <TileLayerDropdown tileLayer={tileLayer} onTileLayerChange={setTileLayer} />
          </div>
          <div className='ml-auto flex items-center gap-4'>
            <div className='hidden xs:block'>
              <ThemeToggle />
            </div>
            <button onClick={() => setIsSidePanelOpen(true)} className='hidden xs:block'>
              <Hamburger className='size-6 cursor-pointer lg:hidden' />
            </button>
          </div>
        </div>
        <div className='grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4'>
          <div className='relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1'>
            <Map coords={coords} onMapClick={onMapClick} tileLayer={tileLayer} />
          </div>
          <div className='col-span-1 2xl:row-span-2 order-2'>
            <Suspense fallback={<CurrentWeatherSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>
          <div className='col-span-1 order-3 2xl:order-4 2xl:row-span-2'>
            <Suspense fallback={<DailyForecastSkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>
          <div className='col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3'>
            <Suspense fallback={<HourlyForecastSkeleton />}>
              <HourlyForecast coords={coords} />
            </Suspense>
          </div>
          <div className='col-span-1 md:col-span-2 2xl:row-span-1 order-5'>
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionalInfo coords={coords} />
            </Suspense>
          </div>
        </div>
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
