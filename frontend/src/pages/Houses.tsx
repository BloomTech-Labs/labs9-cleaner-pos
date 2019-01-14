import React, { useState, useLayoutEffect, useRef } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from '../components/shared_components/index';
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

const cardHeight = 100;
const HouseItem = styled('div')`
  width: 70%;
  height: ${cardHeight}px;
  margin: auto;
  margin-top: 25px;
  display: flex;
  text-align: left;
  -moz-box-shadow: 0 0 3px #000;
  -webkit-box-shadow: 0 0 3px #000;
  box-shadow: 0 0 3px #000;
  h4 {
    font-size: 18px;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  p {
    font-size: 10px;
    margin-block-start: 0;
    margin-block-end: 1;
  }
`;
const ButtonContainer = styled('div')`
  display: flex;
  flex-direction: column;
`;
const ThumbNail = styled('img')`
  width: ${cardHeight}px;
  height: ${cardHeight}px;
`;
const CardHeading = styled('div')``;
const CardContent = styled('div')`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CardBody = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const CheckList = styled('div')`
  text-align: center;
  -moz-box-shadow: 0 0 3px #ccc;
  -webkit-box-shadow: 0 0 3px #ccc;
  box-shadow: 0 0 3px #ccc;
`;

const Cleaner = styled('div')`
  display: flex;
  flex-direction: column;
`;
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
    <div>
      {houses.map((house) => {
        return (
          <HouseItem key={house.id} data-testid='house-item'>
            <ThumbNail
              src='https://www.samplemcdougald.org/wp-content/uploads/2017/10/visit-sample-mcdougald-300x300.jpg'
              alt='house'
            />
            <CardContent>
              <CardHeading>
                <h4>{house.name}</h4>
                <p>{house.address}</p>
              </CardHeading>
              <CardBody>
                <CheckList>
                  <p>Checklist Items</p> 27
                </CheckList>
                <ButtonContainer>
                  <Button text='Edit Checklists' datatestid='house-button' />
                  <Button text='Edit Resources' datatestid='house-button' />
                </ButtonContainer>
                <Cleaner>
                  Default Cleaner
                  <select>
                    <option>Cleaner Jon</option>
                  </select>
                </Cleaner>
              </CardBody>
            </CardContent>
          </HouseItem>
        );
      })}
    </div>
  );
};

export default Houses;
