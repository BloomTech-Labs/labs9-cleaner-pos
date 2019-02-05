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
import { useFetch, axiosFetch } from '../../helpers/';
import img from '../assets/ronald.jpg';
import { hostname } from 'os';
import loadingIndicator from '../utils/loading.svg';

export interface AstProps {
  list_id?: number;
  removeDefault: any;
}

const AssistantCard = (props: any) => {
  const [taskLoad, setTaskLoad] = useState(0);
  console.log(taskLoad);
  const assistant = props.assistant;

  useEffect(
    () => {
      setTaskLoad(0);
    },
    [props.assistant],
  );
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
          <Button text=' Go Back' className='fas fa-arrow-left' />
        </div>
        <PropertyContainer>
          <PropertyHeading>
            <h2>Default Properties</h2>
            {/* <Button className='button-new' text='+ New' /> */}
          </PropertyHeading>
          <PropertyList>
            {assistant.default_house.map((house: any) =>
              taskLoad === house.house_id ? (
                <img
                  key={house.house_id}
                  src={loadingIndicator}
                  alt='animated loading indicator'
                />
              ) : (
                <HouseItem key={house.house_id}>
                  {house.house_name}
                  <span
                    onClick={() => {
                      props.removeDefault(house.house_id);
                      setTaskLoad(house.house_id);
                    }}
                    className='hide'
                  >
                    <i className='fas fa-times' />
                  </span>
                </HouseItem>
              ),
            )}
          </PropertyList>
        </PropertyContainer>

        <PropertyContainer>
          <PropertyHeading>
            <h2>Available Properties</h2>
            <Button className='button-new' text='+ New' />
          </PropertyHeading>
          <PropertyList>
            {assistant.avl_houses.map((house: any) =>
              taskLoad === house.house_id ? (
                <img
                  key={house.house_id}
                  src={loadingIndicator}
                  alt='animated loading indicator'
                />
              ) : (
                <HouseItem key={house.house_id}>
                  {house.house_name}
                  <span className='hide'>
                    <i className='fas fa-times' />
                  </span>
                  <span
                    onClick={() => {
                      props.removeDefault(house.house_id, true);
                      setTaskLoad(house.house_id);
                    }}
                    className='hide'
                  >
                    <i className='fa fa-plus' />
                  </span>
                </HouseItem>
              ),
            )}
          </PropertyList>
        </PropertyContainer>
      </AsstProperty>
    </AssistantBar>
  );
};

const AssistantDetails = (props: any) => {
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';
  const { id } = props.match.params;
  const [fetch, setFetch] = useState(false);
  console.log('id', id);
  const [assistant, error, loading] = useFetch(
    `${url}/assistants/${id}`,
    fetch,
  );

  async function removeDefault(houseId: number, addD: boolean = false) {
    const dAst = addD ? id : null;
    const nullDefault = { default_ast: dAst };
    console.log('test');
    await axiosFetch('put', `${url}/houses/${houseId}`, nullDefault).catch(
      (e: any) => {
        console.error(e);
      },
    );
    setFetch((prev) => !prev);
  }

  // const assistant = {
  //   user_id: 10,
  //   ast_id: 7,
  //   full_name: 'Big Stevo 7',
  //   address: '123 Test St',
  //   photo_url: null,
  //   default_house: [
  //     {
  //       house_id: 4,
  //       house_name: 'house name 4',
  //     },
  //     {
  //       house_id: 5,
  //       house_name: 'house name 5',
  //     },
  //   ],
  //   avl_houses: [
  //     {
  //       house_id: 6,
  //       house_name: 'house name 6',
  //     },
  //   ],
  // };

  return (
    <AssistantDetailContainer>
      {error.error ? 'Whoops! Something went wrong! :(' : null}
      {assistant ? (
        <AssistantCard
          className='assistant-card'
          assistant={assistant}
          removeDefault={removeDefault}
        />
      ) : null}
      <LeafletMap />
    </AssistantDetailContainer>
  );
};

export default AssistantDetails;
