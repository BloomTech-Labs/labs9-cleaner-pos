import React, { useState, useLayoutEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, } from '../components/shared_components/index';
import axios from 'axios';
import styled from '@emotion/styled';

interface HousesEnum extends Array<House> {}

interface House {
  id?: number;
  name: string;
  address: string;
  price: number;
  cleaning_fee: number;
  extra_guest_fee: number;
  default_ast?: string;
  manager?: string;
  guest_guide?: any;
  ast_guide?: any;
}

const Container = styled('div')`
  /* background-color: gray; */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HouseItem = styled('div')`
  width: 35%;
  height: 125px;
  margin: auto;
  margin-top: 25px;
  border: 1px solid black;
  border-radius: 10px;
  h4 {
    margin-block-end: 0;
  }
  h6 {
    margin-block-start: 0;
    margin-block-end: 1;
  }
`;
const ButtonContainer = styled('div')``;

const Houses = (props: RouteComponentProps) => {
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
      {houses.map((house) => {
        return (
          <HouseItem key={house.id} data-testid='house-item'>
            <h4>{house.name}</h4>
            <h6>{house.address}</h6>
            <Button text='Edit Checklists' datatestid='house-button' />
            <Button text='Edit Resources' datatestid='house-button' />
          </HouseItem>
        );
      })}
    </Container>
  );
};

export default Houses;
