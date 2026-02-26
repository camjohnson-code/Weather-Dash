import { useQuery } from '@tanstack/react-query';
import { getWeather } from './api.ts';
import DailyForecast from './components/cards/DailyForecast.tsx';
import HourlyForecast from './components/cards/HourlyForecast.tsx';
import CurrentWeather from './components/cards/CurrentWeather.tsx';
import AdditionalInfo from './components/cards/AdditionalInfo.tsx';

function App() {
  const { data, isFetching, isError, error } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 33.44, lon: -94.04 }),
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col gap-8'>
      <CurrentWeather />
      <HourlyForecast />
      <DailyForecast />
      <AdditionalInfo />
    </div>
  );
}

export default App;
