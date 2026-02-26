import Card from './Card.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getWeather } from '../../api.ts';
import WeatherIcon from '../WeatherIcon.tsx';

type Props = {};

export default function CurrentWeather({}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 33.44, lon: -94.04 }),
  });

  return (
    <Card title='Current Weather' childrenClassName='flex flex-col items-center gap-6'>
      <div className='flex flex-col gap-2 items-center'>
        <h2 className='text-6xl font-semibold text-center'>{Math.round(data.current.temp)}°F</h2>
        <WeatherIcon className='size-14' src={data.current.weather[0].icon} />
        <h3 className='capitalize text-xl'>{data.current.weather[0].description}</h3>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-xl text-center'>Local Time:</p>
        <h3 className='text-4xl font-semibold'>
          {new Intl.DateTimeFormat('en-us', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>
      <div className='flex justify-between w-full'>
        <div className='flex flex-col gap-2 items-center'>
          <p className='text-gray-500'>Feels Like</p>
          <p>{Math.round(data.current.feels_like)}°F</p>
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <p className='text-gray-500'>Humidity</p>
          <p>{Math.round(data.current.humidity)}</p>
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <p className='text-gray-500'>Wind</p>
          <p>{Math.round(data.current.wind_speed)} mph</p>
        </div>
      </div>
    </Card>
  );
}
