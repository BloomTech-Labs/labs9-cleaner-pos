import React, { useState } from 'react';
import { Lists, List, ListProps } from './types';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
import {
  Header,
  ListDiv,
  WhiteButton,
  ItemDiv,
  TaskDiv,
  AfterHeader,
  AfterItemDiv,
  AfterListDiv2,
} from './PropertyDetails.styling';
import { TextField } from '@material-ui/core';
import styled from '@emotion/styled';

export const PropertyLists = (props: ListProps) => {
  const [errors, setErrors] = useState({ msg: '', error: false });
  const [newItem, setNewItem] = useState('');
  const [inputItem, setInputItem] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };

  const toggleText = () => {
    setInputItem(!inputItem);
  };

  const submitNew = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers: AxiosRequestConfig = {
        headers: { Authorization: token },
      };
    } catch (e) {
      axiosErrorHandler(setErrors);
    }
  };
  console.log(newItem, inputItem);
  return (
    <ListDiv>
      <Header>{props.type}</Header>
      <ItemDiv>
        <TaskDiv>
          {props.list.map((task) => {
            return (
              <div key={task.items_id}>
                <input
                  type='checkbox'
                  name={task.task}
                  checked={false}
                  readOnly
                  data-testid={'checkbox'}
                />
                <label htmlFor={task.task}>{task.task}</label>
              </div>
            );
          })}
        </TaskDiv>
        {inputItem ? (
          <>
            <TextField
              placeholder='Add New Item'
              value={newItem}
              onChange={handleChange}
            />
            <WhiteButton text='Submit' onClick={toggleText} />
            <WhiteButton text='Cancel' onClick={toggleText} />
          </>
        ) : (
          <WhiteButton text='+ Add New Item' onClick={toggleText} />
        )}
      </ItemDiv>
    </ListDiv>
  );
};

export const AfterPropertyLists = (props: ListProps) => {
  console.log(props);
  return (
    <AfterListDiv2>
      <AfterHeader>{props.type}</AfterHeader>
      <AfterItemDiv>
        <TaskDiv>
          {props.list.map((task) => {
            return (
              <div key={task.items_id}>
                <input
                  type='checkbox'
                  name={task.task}
                  checked={false}
                  readOnly
                  data-testid={'checkbox'}
                />
                <label htmlFor={task.task}>{task.task}</label>
              </div>
            );
          })}
        </TaskDiv>
        <WhiteButton text='+ Add New Item' />
      </AfterItemDiv>
    </AfterListDiv2>
  );
};
