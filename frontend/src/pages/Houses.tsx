import React, { useState, useLayoutEffect, useRef } from 'react';
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

const cardHeight = 216;

const HouseItem = styled('div')`
  max-width: ${1136 * 0.9}px;
  height: ${cardHeight}px;
  border-radius: 0px;
  padding-left: 1px;
  margin-top: 24px;
  display: flex;
  text-align: left;
  border: 0.5px solid black;
  -webkit-box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
`;

const ButtonContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ThumbNail = styled('img')`
  width: ${cardHeight - 1}px;
  height: ${cardHeight - 1}px;
`;

const CardHeading = styled('div')`
  margin-top: 12px;
  height: 76px;
  h4 {
    margin: 0;
    font-family: Roboto;
    font-weight: bold;
    font-size: 30px;
  }
  p {
    font-weight: light;
    font-size: 16px;
    margin-block-start: 0;
    margin-block-end: 0;
  }
`;
const CardContent = styled('div')`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CardBody = styled('div')`
  display: flex;
  justify-content: space-around;
`;

const CheckList = styled('div')`
  text-align: center;
  -moz-box-shadow: 0 0 3px #000;
  -webkit-box-shadow: 0 0 3px #000;
  box-shadow: 0 0 3px #000;
  padding: 0px 15px;
  font-size: 24px;
  font-weight: light;
  p {
    margin: auto;
    font-weight: bold;
  }
`;

const Cleaner = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HousesContainer = styled('div')`
  font-family: roboto;
  position: relative;
  width: 70%;
  margin: 0 auto;
  padding-top: 48px;
  span {
    font-size: 36px;
    position: absolute;
    top: 0;
    left: 0;
    text-align: left;
    border-bottom: 1px solid #b8003f;
  }
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
    <HousesContainer>
      <span>Recent Properties</span>
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
    </HousesContainer>
  );
};

export default Houses;
