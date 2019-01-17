import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Container } from '../../components/index';
import 'leaflet/dist/leaflet.css';


const LeafletMap = () => {
    // Set state for map coordinates
    const [coordinates, setCoordinates] = useState({
        lat: 51.505,
        lng: -.09,
        zoom: 13,
    });

    return(
        <Container>
        <Map center={[coordinates.lat, coordinates.lng]} zoom={coordinates.zoom}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[coordinates.lat, coordinates.lng]}>
                <Popup>
                    A pretty CSS3 popup.
                    <br />
                    Easily customizable.
                </Popup>
            </Marker>
        </Map>
        </Container>
    );
};

export default LeafletMap;
