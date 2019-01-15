import React, { useState, useLayoutEffect, useRef } from 'react';
import { Button, Container } from '../../components/shared_components/index';
import axios from 'axios';

const Houses = () => {
const [houses, setHouses] = useState<HousesEnum>([]);
const shouldFetch = useRef(true);
async function fetchHouses() {
    try {
        const res = await axios.get('https://cleaner-pos.herokuapp.com/houses');
        setHouses(res.data);
    } catch (e) {
        throw e;
    }
}

useLayoutEffect(
    () => {
        fetchHouses();
        shouldFetch.current = false;
    },
    [shouldFetch],
);

return (
    <Container>
    </Container>
);
};

export default Houses;
