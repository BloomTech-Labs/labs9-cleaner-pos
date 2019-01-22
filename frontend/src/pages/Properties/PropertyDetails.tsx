import React, { useState, useEffect } from 'react';
import { Container, Button } from '../../components/index';
import axios from 'axios';
import { axiosErrorHandler } from '../utils';
import styled from '@emotion/styled';
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

const WhiteButton = styled(Button)`
  color: var(--colour-button-text-alt);
  background-color: var(--colour-button-background-alt);
`;

const HouseDetails = (props: any) => {
  const [house, setHouse] = useState(props.location.state);
  // TODO: fix this type
  const [lists, setLists] = useState<any>({});
  const [errors, setErrors] = useState({ msg: '', error: false });
  let shouldFetch = house ? false : true;
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com/';

  async function fetchHouse(id: number) {
    try {
      const res = await axios.get(`${url}/houses/${id}`);
      setHouse(res.data);
      shouldFetch = false;
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }

  async function fetchLists(id: number) {
    try {
      const res = await axios.get(`${url}/lists/${id}`);
      setLists(res.data);
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }

  if (shouldFetch) {
    fetchHouse(props.match.params.id);
  }

  useEffect(() => {
    fetchLists(props.match.params.id);
  }, []);

  return (
    <Container>
      <div>
        <ThumbNail
          src='https://www.samplemcdougald.org/wp-content/uploads/2017/10/visit-sample-mcdougald-300x300.jpg'
          alt='house'
        />
        <p>{house.name}</p>
        <p>{house.address}</p>
      </div>
      <div>
        <Button text='Go Back' colour='var(--colour-accent)' />
      </div>
      {lists.before ? (
        <>
          <div>
            Before
            <ul>
              {lists.before.map((item: any) => {
                return <li key={item.id}>{item.task}</li>;
              })}
              <WhiteButton text='+ Add New Item' />
            </ul>
            During
            <ul>
              {lists.during.map((item: any) => {
                return <li key={item.id}>{item.task}</li>;
              })}
              <WhiteButton text='+ Add New Item' />
            </ul>
          </div>
          <div>
            {lists.after.map((aList: any) => {
              return (
                <div>
                  {aList.time}
                  <ul>
                    {aList.afterLists.map((item: any) => {
                      return <li>{item.task}</li>;
                    })}
                  </ul>
                  <WhiteButton text='+ Add New Item' />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div>no</div>
      )}
    </Container>
  );
};

export default HouseDetails;
