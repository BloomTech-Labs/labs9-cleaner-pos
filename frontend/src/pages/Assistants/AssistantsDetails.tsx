import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, LeafletMap } from '../../components/index';
import {
  AssistantBar,
  AsstDetail,
  AssistantDetailContainer,
  AsstProperty,
  PropertyContainer,
  PropertyHeading,
  PropertyList,
  ThumbNail,
  HouseItem,
} from './Assistants.styling';
import { useFetch } from '../../helpers/';
import img from '../assets/ronald.jpg';
import { hostname } from 'os';

const AssistantCard = (assistant: any) => {
  return (
    <AssistantBar className={assistant.className}>
      <AsstDetail>
        <ThumbNail className='detail-img' src={img} alt={assistant.full_name} />
        <div className='detail-txt'>
          <h2>{assistant.full_name}</h2>
          <h3>{assistant.address}</h3>
        </div>
      </AsstDetail>
      <AsstProperty>
        <div className='button-group'>
          <Button text='Edit Assistant' />
          <Button text='Go Back' />
        </div>
        <PropertyContainer>
          <PropertyHeading>
            <h2>Default Properties</h2>
            <Button className='button-new' text='+ New' />
          </PropertyHeading>
          <PropertyList>
            {assistant.default_house.map((house: any) => (
              <HouseItem key={house.house_id}>
                {house.house_name}
                <span className='hide'>
                  <i className='fas fa-trash-alt' />
                </span>
              </HouseItem>
            ))}
          </PropertyList>
        </PropertyContainer>

        <PropertyContainer>
          <PropertyHeading>
            <h2>Available Properties</h2>
            <Button className='button-new' text='+ New' />
          </PropertyHeading>
          <PropertyList>
            {assistant.avl_houses.map((house: any) => (
              <HouseItem key={house.house_id}>
                {house.house_name}
                <span className='hide'>
                  <i className='fas fa-backspace' />
                </span>
              </HouseItem>
            ))}
          </PropertyList>
        </PropertyContainer>
      </AsstProperty>
    </AssistantBar>
  );
};

const AssistantDetails = (props: any) => {
  const { id } = props.match.params;
  // console.log('id', id);
  // const [assistant, error, loading] = useFetch(
  //   `https://cleaner-pos.herokuapp.com/assistants/${id}`,
  // );
  const assistant = {
    user_id: 10,
    ast_id: 7,
    full_name: 'Big Stevo 7',
    address: '123 Test St',
    photo_url: null,
    default_house: [
      {
        house_id: 4,
        house_name: 'house name 4',
      },
      {
        house_id: 5,
        house_name: 'house name 5',
      },
    ],
    avl_houses: [
      {
        house_id: 6,
        house_name: 'house name 6',
      },
    ],
  };

  return (
    <AssistantDetailContainer>
      {/* {loading ? '...Loading' : null}
      {error.error ? 'Whoops! Something went wrong ☹️' : null} */}
      {assistant ? (
        <AssistantCard className='assistant-card' {...assistant} />
      ) : null}
      <LeafletMap />
    </AssistantDetailContainer>
  );
};

export default AssistantDetails;
