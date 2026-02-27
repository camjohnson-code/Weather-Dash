import Card from './Card.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getWeather } from '../../api.ts';
import WeatherIcon from '../WeatherIcon.tsx';
import type { Coords } from '../../types.ts';

type Props = {
  coords: Coords;
};

export default function HourlyForecast({ coords }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
  });

  return (
    <Card title='Hourly Forecast (48 hours)' childrenClassName='flex gap-6 overflow-x-scroll'>
      {data.hourly.map((hour) => (
        <div className='flex flex-col gap-2 items-center p-2 2xl:justify-between' key={hour.dt}>
          <p className='whitespace-nowrap 2xl:scale-110'>
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: 'numeric',
              hour12: true,
              minute: '2-digit',
            })}
          </p>
          <WeatherIcon className='2xl:size-10' src={hour.weather[0].icon} />
          <p className='2xl:scale-110'>{Math.round(hour.temp)}°F</p>
        </div>
      ))}
    </Card>
  );
}
