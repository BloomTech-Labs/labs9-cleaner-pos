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
import { TextField } from '@material-ui/core';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
import { Lists } from './types';

// TODO: fix types
const PropertyDetails = (props: any) => {
  const [property, setProperty] = useState(props.location.state);
  const [lists, setLists] = useState({} as Lists);
  const [errors, setErrors] = useState({ msg: '', error: false });
  const [shouldFetch, setShouldFetch] = useState(true);
  const [newItem, setNewItem] = useState('');
  const [inputItem, setInputItem] = useState(false);

  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

  async function fetchHouse(id: number) {
    try {
      const token = localStorage.getItem('token');

      // if (!token) {
      //   setErrors({
      //     msg: 'Authentication error. Please try logging in again.',
      //     error: true,
      //   });
      //   return;
      // }
      const headers: AxiosRequestConfig = {
        headers: { Authorization: token },
      };
      const res = await axios.get(`${url}/houses/${id}`, headers);
      setProperty(res.data);
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }

  async function fetchLists(id: number) {
    try {
      const res = await axios.get(`${url}lists/${id}`);
      setLists(res.data);
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }

  async function submitNew(newTaks: any) {
    try {
      await axios.post(`${url}items/`, newTaks);
      fetchLists(props.match.params.id);
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }

  async function deleteTasks(id: number) {
    try {
      await axios.delete(`${url}items/${id}`);
      fetchLists(props.match.params.id);
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }
  async function deleteList(id: number) {
    try {
      await axios.delete(`${url}lists/${id}`);
      fetchLists(props.match.params.id);
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewItem(event.target.value);
  }
  function toggleText() {
    setInputItem(!inputItem);
  }
  async function newList() {
    try {
      const postList = {
        type: 'after',
        house_id: property.id,
        hours_after: newItem,
      };
      await axios.post(`${url}lists/`, postList);
      toggleText();
      setNewItem('');
      fetchLists(props.match.params.id);
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }
  useEffect(() => {
    fetchHouse(props.match.params.id);
  }, []);

  useEffect(() => {
    fetchLists(props.match.params.id);
    setShouldFetch(false);
  }, [shouldFetch]);

  return (
    <>
      <div>{errors.msg}</div>
      {!lists.before || shouldFetch ? (
        <div>Loading.....</div>
      ) : (
        <PropertyContainer>
          <ThumbNail
            src='https://www.samplemcdougald.org/wp-content/uploads/2017/10/visit-sample-mcdougald-300x300.jpg'
            alt='house'
          />
          <Top>
            <MainText data-testid='house-detail'>{property.name}</MainText>
            <SecondaryText>{property.address}</SecondaryText>
		  <BackButton text='Edit Property' colour='var(--colour-accent)' />
		  <BackButton
			text='Go Back'
			colour='var(--colour-accent)'
			onClick={() => props.history.push('/properties')}
		  />
		  </Top>
          <ListContainer>
            <PropertyLists
              list={lists.before}
              list_id={lists.before_id}
              type='Before'
              submitNew={submitNew}
              deleteTasks={deleteTasks}
            />
            <PropertyLists
              list={lists.during}
              list_id={lists.during_id}
              type='During'
              submitNew={submitNew}
              deleteTasks={deleteTasks}
            />
          </ListContainer>
          <AfterListDiv>
            <Header>After Stay</Header>
            {lists.after.map((aList: any) => {
              return (
                <AfterPropertyLists
                  key={aList.time}
                  list={aList.afterLists}
                  list_id={aList.after_id}
                  type={aList.time}
                  submitNew={submitNew}
                  deleteTasks={deleteTasks}
                  deleteList={deleteList}
                />
              );
            })}
            {inputItem ? (
              <>
                <TextField
                  placeholder='Number of hours'
                  type='number'
                  value={newItem}
                  onChange={handleChange}
                />
                <WhiteButton text='Submit' onClick={newList} />
                <WhiteButton text='Cancel' onClick={toggleText} />
              </>
            ) : (
              <WhiteButton text='+ New Stay List' onClick={toggleText} />
            )}
          </AfterListDiv>
        </PropertyContainer>
      )}
    </>
  );
};

export default PropertyDetails;
