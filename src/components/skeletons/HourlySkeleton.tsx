import Card from '../cards/Card.tsx';
import { Skeleton } from '../ui/skeleton.tsx';

type Props = {};

export default function HourlyForecastSkeleton({}: Props) {
  return (
    <Card title='Hourly Forecast (48 hours)' childrenClassName='flex gap-6 overflow-x-scroll'>
      {Array.from({ length: 48 }).map((_, index) => (
        <div className='flex flex-col gap-2 items-center p-2' key={index}>
          <Skeleton className='w-16 h-6' />
          <Skeleton className='size-8 rounded-full' />
          <Skeleton className='w-16 h-6' />
        </div>
      ))}
    </Card>
  );
}
