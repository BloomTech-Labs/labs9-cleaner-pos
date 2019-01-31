import styled from '@emotion/styled';

// The class .container-map with defined height is essential to have map rendered

const MapDiv = styled('div')`
    .container-map {
        height: 1000px;
        /* width: 1000px; */
    }
    .leaflet-container {
        height: 800px;
        width: 700px;
    }
`;

export default MapDiv;
