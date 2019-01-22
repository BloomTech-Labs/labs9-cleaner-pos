import React, { useState, useEffect } from 'react';
import PropertyLists from './PropertyLists';
import { Container, Button } from '../../components/index';
import axios from 'axios';
import { axiosErrorHandler } from '../utils';
import styled from '@emotion/styled';
import { Lists } from './types';
import { ThumbNail } from './Properties.styling';

const WhiteButton = styled(Button)`
  color: var(--colour-button-text-alt);
  background-color: var(--colour-button-background-alt);
`;

// TODO: fix types
const PropertyDetails = (props: any) => {
  const [property, setProperty] = useState(props.location.state);
  const [lists, setLists] = useState({} as Lists);
  const [errors, setErrors] = useState({ msg: '', error: false });
  let shouldFetch = property ? false : true;
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com/';

  async function fetchHouse(id: number) {
    try {
      const res = await axios.get(`${url}/houses/${id}`);
      setProperty(res.data);
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
      {!lists.before || shouldFetch ? (
        <div>Loading.....</div>
      ) : (
        <>
          <div>
            <ThumbNail
              src='https://www.samplemcdougald.org/wp-content/uploads/2017/10/visit-sample-mcdougald-300x300.jpg'
              alt='house'
            />
            <p>{property.name}</p>
            <p>{property.address}</p>
          </div>
          <div>
            <Button text='Go Back' colour='var(--colour-accent)' />
          </div>
          <div>
            <PropertyLists {...lists.before} />
            During
            <ul>
              {lists.during.map((item: any) => {
                return <li key={item.items_id}>{item.task}</li>;
              })}
              <WhiteButton text='+ Add New Item' />
            </ul>
          </div>
          <div>
            {lists.after.map((aList: any) => {
              return (
                <div key={aList.time}>
                  {aList.time}
                  <ul>
                    {aList.afterLists.map((item: any) => {
                      return <li key={item.items_id}>{item.task}</li>;
                    })}
                  </ul>
                  <WhiteButton text='+ Add New Item' />
                </div>
              );
            })}
          </div>
        </>
      )}
    </Container>
  );
};

export default PropertyDetails;
