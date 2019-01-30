import styled from '@emotion/styled';

// The class .container-map with defined height is essential to have map rendered

const MapDiv = styled('div')`
    .container-map {
        height: 500px;
        width: 500px;
    }
    .leaflet-container {
        height: 400px;
        width: 400px;
    }
`;

export default MapDiv;
