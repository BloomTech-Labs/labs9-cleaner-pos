import styled from '@emotion/styled';


// The class .container-map with defined height is essential to have map rendered

const MapDiv = styled('div')`
    .container-map {
        height: 500px;
        @media only screen and (max-width: 700px) {
            height: 250px;
        }
    }
`;

export default MapDiv;
