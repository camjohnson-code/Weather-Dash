import Card from './Card.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getWeather } from '../../api.ts';
import WeatherIcon from '../WeatherIcon.tsx';

type Props = {};

export default function HourlyForecast({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 33.44, lon: -94.04 }),
  });

  return (
    <Card title='Hourly Forecast (48 hours)' childrenClassName='flex gap-6 overflow-x-scroll'>
      {data.hourly.map((hour) => (
        <div className='flex flex-col gap-2 items-center p-2' key={hour.dt}>
          <p className='whitespace-nowrap'>
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: 'numeric',
              hour12: true,
              minute: '2-digit',
            })}
          </p>
          <WeatherIcon src={hour.weather[0].icon} />
          <p>{Math.round(hour.temp)}°F</p>
        </div>
      ))}
    </Card>
  );
}
