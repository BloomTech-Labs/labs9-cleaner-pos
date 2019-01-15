import React, { useState, useLayoutEffect, useRef } from 'react';
import { Button, Container } from '../../components/shared_components/index';
import axios from 'axios';
import {
  HouseItem,
  CardBody,
  ThumbNail,
  CardContent,
  ButtonContainer,
  CardHeading,
  Cleaner,
  CheckList,
  HouseHeader,
} from './Houses.styling';

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
      <HouseHeader>Recent Properties</HouseHeader>
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
    </Container>
  );
};

export default Houses;
