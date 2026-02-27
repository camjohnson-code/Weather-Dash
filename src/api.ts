const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
import { AirPollutionResponseSchema } from './schemas/airPollutionSchema';
import { OneCallResponseSchema } from './schemas/weatherSchema';
import { z } from 'zod';

export async function getWeather({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<z.infer<typeof OneCallResponseSchema>> {
  const results = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`,
  );
  const data = await results.json();

  return OneCallResponseSchema.parse(data);
}

export async function getAirPollution({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<z.infer<typeof AirPollutionResponseSchema>> {
  const results = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  );
  const data = await results.json();

  return AirPollutionResponseSchema.parse(data);
}
