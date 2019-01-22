import React, { useState, useEffect } from 'react';
import { PropertyLists, AfterPropertyLists } from './PropertyLists';
import {
  PropertyContainer,
  ThumbNail,
  Top,
  MainText,
  SecondaryText,
  ListContainer,
  BackButton,
  Header,
  AfterListDiv,
  WhiteButton,
} from './PropertyDetails.styling';
import axios from 'axios';
import { axiosErrorHandler } from '../utils';
import { Lists } from './types';

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
    <>
      {!lists.before || shouldFetch ? (
        <div>Loading.....</div>
      ) : (
        <PropertyContainer>
          <ThumbNail
            src='https://www.samplemcdougald.org/wp-content/uploads/2017/10/visit-sample-mcdougald-300x300.jpg'
            alt='house'
          />
          <Top>
            <MainText>{property.name}</MainText>
            <SecondaryText>{property.address}</SecondaryText>
          </Top>
          <BackButton text='Go Back' colour='var(--colour-accent)' />
          <ListContainer>
            <PropertyLists list={lists.before} type='Before' />
            <PropertyLists list={lists.during} type='During' />
          </ListContainer>
          <AfterListDiv>
            <Header>After Stay</Header>
            {lists.after.map((aList: any) => {
              return (
                <AfterPropertyLists
                  key={aList.time}
                  list={aList.afterLists}
                  type={aList.time}
                />
              );
            })}
            <WhiteButton text='+ New Stay List' />
          </AfterListDiv>
        </PropertyContainer>
      )}
    </>
  );
};

export default PropertyDetails;
