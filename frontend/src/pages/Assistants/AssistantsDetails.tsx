import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, LeafletMap } from '../../components/index';
import {
  AssistantBar,
  AsstDetail,
  AssistantDetailContainer,
  AsstProperty,
  PropertyContainer,
  PropertyHeading,
  ThumbNail,
} from './Assistants.styling';
import { useFetch } from '../../helpers/';
import img from '../assets/ronald.jpg';
import { hostname } from 'os';

const AssistantCard = (assistant: any) => {
  return (
    <AssistantBar>
      <AsstDetail>
        <ThumbNail
          src={img}
          style={{ width: '96px', height: '96px' }}
          alt={assistant.full_name}
        />
        <div style={{ marginLeft: '1rem' }}>
          <h2>{assistant.full_name}</h2>
          <h3>{assistant.address}</h3>
        </div>
      </AsstDetail>
      <AsstProperty>
        <PropertyContainer>
          <PropertyHeading>
            <h2>Default Properties</h2>
          </PropertyHeading>
          {assistant.default_house.map((house: any) => (
            <p key={house.house_id}>{house.house_name}</p>
          ))}
          <Button text='+ Add New Item' />
        </PropertyContainer>

        <PropertyContainer>
          <PropertyHeading>
            <h2>Available Properties</h2>
          </PropertyHeading>
          {assistant.avl_houses.map((house: any) => (
            <div key={house.house_id}>house.house_name</div>
          ))}
          <Button text='+ Add New Item' />
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
    address: null,
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
      {assistant ? <AssistantCard {...assistant} /> : null}
      <LeafletMap />
    </AssistantDetailContainer>
  );
};

export default AssistantDetails;
