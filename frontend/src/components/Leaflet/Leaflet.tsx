import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import MapDiv from './Leaflet.styling';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import Pointer from './33622.svg';

// @ts-ignore
const Geocode = require('react-geocode');

Geocode.default.setApiKey(process.env.REACT_APP_GEO);
console.log(Geocode);

Geocode.default.enableDebug();



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

const LeafletMap = (props: { className?: string }) => {
  // Set state for map coordinates
  const [coordinates, setCoordinates] = useState({
    lat: 38.695394,
    lng: -121.013766,
    zoom: 15,
  });

  const Positions = [[38.6953, -121.0137], [38.695394, -121.013766]];
  const position: [number, number] = [coordinates.lat, coordinates.lng];
  if (false) {
    Geocode.default.fromAddress('1600 Ampitheatre Parkway, Mountain View, CA')
    .then((response: any) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat, lng);
    })
    .catch((error: any) => {
      console.error(error);
    });
  }

  return (
    <MapDiv>
      <Map className='container-map' center={position} zoom={coordinates.zoom}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {Positions.map((latlng: any) => {
          return (
            <Marker position={latlng} icon={iconPerson}>
              <Popup>
                A pretty CSS3 popup.
                <br />
                Easily customizable.
              </Popup>
            </Marker>
          );
        })}
      </Map>
    </MapDiv>
  );
};

export default LeafletMap;
