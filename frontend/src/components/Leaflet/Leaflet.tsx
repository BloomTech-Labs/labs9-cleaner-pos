import React, { useState } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Container } from '../../components/index';
import 'leaflet/dist/leaflet.css';
import styled from '@emotion/styled';

const DumbDiv = styled('div')`
    .container-map {
        height: 500px;
    }
`;

const LeafletMap = () => {
    // Set state for map coordinates
    const [coordinates, setCoordinates] = useState({
        lat: 51.505,
        lng: -.09,
        zoom: 13,
    });

    const position: [number, number] = [coordinates.lat, coordinates.lng];

    return(
        <DumbDiv>
            <Map className='container-map' center={position} zoom={coordinates.zoom}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup.
                        <br />
                        Easily customizable.
                    </Popup>
                </Marker>
            </Map>
        </DumbDiv>
    );
};

export default LeafletMap;
