import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Pointer from './33622.svg';

// @ts-ignore
// tslint:disable-next-line
const Geocode = require('react-geocode');

Geocode.default.setApiKey(process.env.REACT_APP_browser_key);

const iconPerson: any = L.icon({
  iconUrl: Pointer,
  // iconRetinaUrl: null,
  iconAnchor: [20, 40],
  // popupAnchor: null,
  // shadowUrl: Pointer,
  // shadowSize: null,
  // shadowAnchor: [60, 75],
  iconSize: [60, 40],
  // className: 'leaflet-div-icon',
});

export { iconPerson };

const LeafletMap = (props: {
  className?: string;
  default?: any[];
  ast: any;
}) => {
  const [coordinates, setCoordinates] = useState({
    lat: 38.695394,
    lng: -121.013766,
    zoom: 12,
  });
  const [positions, setPositions] = useState<any>([]);
  const { ast } = props;
  const addresses: any = [ast.address.split('\n').join('')];

  ast.default_house.forEach((h: any) => {
    addresses.push(h.house_address.split('\n').join(''));
  });
  ast.avl_houses.forEach((h: any) =>
    addresses.push(h.house_address.split('\n').join('')),
  );
  useEffect(() => {
    geocodeAst();
    geocodeHouses();
  }, []);
  // Set state for map coordinates

  async function geocodeAst() {
    try {
      const add = props.ast.address.split('\n').join('');
      const response = await Geocode.default.fromAddress(add);
      const { lat, lng } = response.results[0].geometry.location;
      await setCoordinates({ lat, lng, zoom: 12 });
      await setPositions([[lat, lng]]);
      // console.log('newlat', lat, lng);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  async function geocodeHouses() {
    for (const address of addresses) {
      try {
        const response = await Geocode.default.fromAddress(address);
        const { lat, lng } = response.results[0].geometry.location;
        await setPositions((prev: any) => [...prev, [lat, lng]]);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <Map
      className='container-map'
      center={[coordinates.lat, coordinates.lng]}
      zoom={coordinates.zoom}
      invalidateSize={true}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {positions.map((latlng: any, index: number) => {
        return <Marker key={index} position={latlng} icon={iconPerson} />;
      })}
    </Map>
  );
};

export default LeafletMap;
