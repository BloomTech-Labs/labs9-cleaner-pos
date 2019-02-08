import React, { useState, useEffect, useContext } from 'react';
import { PropertyLists, AfterPropertyLists } from './PropertyLists';
import {
  PropertyContainer,
  ThumbNail,
  Top,
  HouseInfo,
  MainText,
  SecondaryText,
  ListContainer,
  BackButton,
  PropertyButtons,
  Header,
  AfterListDiv,
  AfterStay,
  WhiteButton,
  DialogButton,
  ButtonGroup,
  DialogStay,
} from './PropertyDetails.styling';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { TextField } from '@material-ui/core';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
import { useFetch } from '../../helpers';
import { UserContext } from '../../App';
import { Lists, List } from './types';
import loadingIndicator from '../utils/loading.svg';
import { Link } from 'react-router-dom';

// TODO: fix types
const PropertyDetails = (props: any) => {
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

  const [property, propertyError, loading] = useFetch(
    `${url}/houses/${props.match.params.id}`,
  );
  const [errors, setErrors] = useState({ msg: '', error: false });
  const [shouldFetch, setShouldFetch] = useState(true);
  const [delLoading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [inputItem, setInputItem] = useState(false);
  const [lists, setLists] = useState({} as Lists);
  const { role } = useContext(UserContext);

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
  async function removeProperty(id: number) {
    setLoading(true);
    try {
      const res = await axios.delete(`${url}/houses/${id}`, headers);
      setLoading(false);
      props.history.push('/properties');
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
        <img src={loadingIndicator} alt='animated loading indicator' />
      ) : (
        <PropertyContainer>
          <Top>
            <HouseInfo>
              <ThumbNail src={property.photo_url} alt='house' />
              <MainText data-testid='house-detail'>{property.name}</MainText>
              <SecondaryText id='address'>{property.address}</SecondaryText>
            </HouseInfo>
            <PropertyButtons>
              <Link to={{ pathname: '/properties/new', state: property }}>
                <BackButton
                  text='Edit Property'
                  color='var(--color-text-accent)'
                />
              </Link>
              <BackButton
                text='Go Back'
                color='var(--color-text-accent)'
                onClick={() => props.history.push('/properties')}
              />
              {role === 'manager' && (
                <>
                  <BackButton
                    text={delLoading ? '' : 'Remove Property'}
                    color='var(--color-error)'
                    onClick={() => removeProperty(property.id)}
                  >
                    {delLoading ? (
                      <img
                        src={loadingIndicator}
                        alt='animated loading indicator'
                      />
                    ) : null}
                  </BackButton>
                </>
              )}
            </PropertyButtons>
          </Top>
          <h1>List Builder</h1>
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
            <Header className='header-after'>
              After Stay{' '}
              <WhiteButton text='+ New Stay List' onClick={toggleText} />
            </Header>
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
            <Dialog
              maxWidth='sm'
              fullWidth={true}
              className='dialog'
              open={inputItem}
              onClose={toggleText}
              aria-labelledby='simple-dialog-title'
            >
              <DialogTitle
                style={{ textAlign: 'center' }}
                id='simple-dialog-title'
              >
                New After Stay List
              </DialogTitle>
              <DialogStay>
                <TextField
                  placeholder='Number of hours'
                  type='number'
                  value={newItem}
                  onChange={handleChange}
                />
                <ButtonGroup>
                  <DialogButton
                    className='submit'
                    text='Submit'
                    onClick={newList}
                  />
                  <DialogButton
                    className='cancel'
                    text='Cancel'
                    onClick={toggleText}
                  />
                </ButtonGroup>
              </DialogStay>
            </Dialog>
          </AfterListDiv>
        </PropertyContainer>
      )}
    </>
  );
};

export default PropertyDetails;
