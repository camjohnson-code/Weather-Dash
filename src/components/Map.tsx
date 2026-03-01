import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import type { Coords } from '../types.ts';
import { branches } from '../data/branches.ts';
import { MaptilerLayer } from '@maptiler/leaflet-maptilersdk';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

type Props = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  tileLayer: string;
};

function MapCenter({ coords }: { coords: Coords }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.setView([coords.lat, coords.lon]);
      map.invalidateSize();
    }, 0);
    return () => clearTimeout(timer);
  }, [coords.lat, coords.lon, map]);

  return null;
}

export default function Map({ coords, onMapClick, tileLayer }: Props) {
  return (
    <MapContainer
      center={[coords.lat, coords.lon]}
      zoom={13}
      maxZoom={15}
      minZoom={7}
      style={{ width: '100%', height: '100%' }}
    >
      <MapCenter coords={coords} />
      <MapClick onMapClick={onMapClick} />
      <MapTiler />
      <TileLayer
        opacity={0.7}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://tile.openweathermap.org/map/${tileLayer}/{z}/{x}/{y}.png?appid=${API_KEY}`}
      />
      {branches.map((branch) => (
        <Marker
          key={branch.name}
          position={[branch.lat, branch.lon]}
          eventHandlers={{
            click: () => onMapClick(branch.lat, branch.lon),
          }}
        >
          <Popup>{branch.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function MapClick({ onMapClick }: { onMapClick: (lat: number, lon: number) => void }): null {
  const map = useMap();

  map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    map.panTo([lat, lng]);
    onMapClick(lat, lng);
  });

  return null;
}

function MapTiler() {
  const map = useMap();

  useEffect(() => {
    const tileLayer = new MaptilerLayer({ style: 'basic-dark', apiKey: MAPTILER_API_KEY });
    tileLayer.addTo(map);

    return () => {
      map.removeLayer(tileLayer);
    };
  }, [map]);

  return null;
}
