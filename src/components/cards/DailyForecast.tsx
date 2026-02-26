import Card from './Card.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getWeather } from '../../api.ts';
import WeatherIcon from '../WeatherIcon.tsx';

type Props = {};

export default function DailyForecast({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 33.44, lon: -94.04 }),
  });

  return (
    <Card title='Daily Forecast' childrenClassName='flex flex-col gap-4'>
      {data.daily.map((day) => {
        return (
          <div key={day.dt} className='flex justify-between'>
            <p className='font-black w-9'>
              {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: 'short',
              })}
            </p>
            <WeatherIcon src={day.weather[0].icon} />
            <p className='font-semibold'>{Math.round(day.temp.day)}°F</p>
            <p className='text-gray-500 / 75'>{Math.round(day.temp.min)}°F</p>
            <p className='text-gray-500 / 75'>{Math.round(day.temp.max)}°F</p>
          </div>
        );
      })}
    </Card>
  );
}
