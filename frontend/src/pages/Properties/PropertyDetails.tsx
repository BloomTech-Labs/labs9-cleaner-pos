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
import { useFetch } from '../../helpers';
import { Lists, List } from './types';
import loadingIndicator from '../utils/loading.svg';

// TODO: fix types
const PropertyDetails = (props: any) => {
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

  const [property, propertyError, loading] = useFetch(
    `${url}/houses/${props.match.params.id}`,
  );
  const [errors, setErrors] = useState({ msg: '', error: false });
  const [shouldFetch, setShouldFetch] = useState(true);
  const [newItem, setNewItem] = useState('');
  const [inputItem, setInputItem] = useState(false);
  const [lists, setLists] = useState({} as Lists);

  const headers: AxiosRequestConfig = {
    headers: { Authorization: localStorage.getItem('token') },
  };

  async function fetchLists(id: number) {
    try {
      const res = await axios.get(`${url}/lists/${id}`, headers);
      setLists(res.data);
      setShouldFetch(false);
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }

  async function submitNew(newTasks: any) {
    try {
      await axios.post(`${url}/items/`, newTasks, headers);
      fetchLists(props.match.params.id);
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }

  async function deleteTasks(id: number) {
    try {
      await axios.delete(`${url}/items/${id}`, headers);
      fetchLists(props.match.params.id);
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }

  async function putTasks(item: List, updatedTask: any) {
    try {
      const task = { task: updatedTask, list_id: item.list_id };
      await axios.put(`${url}/items/${item.items_id}`, task, headers);
      fetchLists(props.match.params.id);
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }

  async function deleteList(id: number) {
    try {
      await axios.delete(`${url}/lists/${id}`, headers);
      setShouldFetch(true);
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
      await axios.post(`${url}/lists/`, postList, headers);
      toggleText();
      setNewItem('');
      setShouldFetch(true);
      fetchLists(props.match.params.id);
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  }

  useEffect(() => {
    fetchLists(props.match.params.id);
  }, []);
  return (
    <>
      <div>{errors.msg}</div>
      {!property ? (
        <div>Loading.....</div>
      ) : (
        <PropertyContainer>
          <ThumbNail src={property.photo_url} alt='house' />
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
            {lists.before ? (
              <PropertyLists
                list={lists.before}
                list_id={lists.before_id}
                type='Before'
                submitNew={submitNew}
                deleteTasks={deleteTasks}
                putTasks={putTasks}
              />
            ) : (
              <img src={loadingIndicator} alt='animated loading indicator' />
            )}
            {lists.during ? (
              <PropertyLists
                list={lists.during}
                list_id={lists.during_id}
                type='During'
                submitNew={submitNew}
                deleteTasks={deleteTasks}
                putTasks={putTasks}
              />
            ) : (
              <img src={loadingIndicator} alt='animated loading indicator' />
            )}
          </ListContainer>
          <AfterListDiv>
            <Header>After Stay</Header>
            {lists.after ? (
              lists.after.map((aList: any) => {
                return (
                  <AfterPropertyLists
                    key={aList.after_id}
                    list={aList.afterLists}
                    list_id={aList.after_id}
                    type={aList.time}
                    submitNew={submitNew}
                    deleteTasks={deleteTasks}
                    deleteList={deleteList}
                    putTasks={putTasks}
                  />
                );
              })
            ) : (
              <img src={loadingIndicator} alt='animated loading indicator' />
            )}
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
              <>
                {shouldFetch ? (
                  <img
                    src={loadingIndicator}
                    alt='animated loading indicator'
                  />
                ) : (
                  <WhiteButton text='+ New Stay List' onClick={toggleText} />
                )}
              </>
            )}
          </AfterListDiv>
        </PropertyContainer>
      )}
    </>
  );
};

export default PropertyDetails;
