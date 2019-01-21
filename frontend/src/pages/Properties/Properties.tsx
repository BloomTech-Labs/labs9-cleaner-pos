import React, { useState, useRef, useEffect } from 'react';
import { Button, Container } from '../../components/index';
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
} from './Properties.styling';
import { HousesEnum } from './types';

const Properties = () => {
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

  useEffect(
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
                  <p>Checklist Items</p>
                  {house.checkList[0].count}
                </CheckList>
                <ButtonContainer>
                  <Button text='Edit Checklists' datatestid='house-button' />
                  <Button text='Edit Resources' datatestid='house-button' />
                </ButtonContainer>
                <Cleaner>
                  Default Cleaner
                  <select>
                    {house.openAst.map((ast: any) => {
                      return <option key={ast.ast_id}>{ast.full_name}</option>;
                    })}
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

export default Properties;
