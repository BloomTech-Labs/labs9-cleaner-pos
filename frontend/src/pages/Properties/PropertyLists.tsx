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
  const [newItem, setNewItem] = useState('');
  const [inputItem, setInputItem] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };

  const toggleText = () => {
    setInputItem(!inputItem);
  };

  const handleDelete = (id: number) => {
    props.deleteTasks(id);
  };
  const handleNew = () => {
    const createTask: any = { list_id: props.list_id, task: newItem };
    props.submitNew(createTask);
    setNewItem('');
    setInputItem(false);
  };
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
                <label
                  htmlFor={task.task}
                  onClick={() => handleDelete(task.items_id)}
                >
                  {task.task}
                </label>
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
            <WhiteButton text='Submit' onClick={handleNew} />
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
  const [newItem, setNewItem] = useState('');
  const [inputItem, setInputItem] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };

  const toggleText = () => {
    setInputItem(!inputItem);
  };

  const handleNew = () => {
    const createTask: any = { list_id: props.list_id, task: newItem };
    props.submitNew(createTask);
    setNewItem('');
    setInputItem(false);
  };

  const handleDelete = (id: number) => {
    props.deleteTasks(id);
  };

  const handleListDelete = () => {
    props.deleteList(props.list_id);
  };
  return (
    <AfterListDiv2 data-testid='after-list'>
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
                <label
                  htmlFor={task.task}
                  onClick={() => handleDelete(task.items_id)}
                >
                  {task.task}
                </label>
              </div>
            );
          })}
        </TaskDiv>
        {inputItem ? (
          <>
            <TextField
              placeholder='Add New Item'
              required={true}
              value={newItem}
              onChange={handleChange}
            />
            <WhiteButton text='Submit' onClick={handleNew} />
            <WhiteButton text='Cancel' onClick={toggleText} />
          </>
        ) : (
          <>
            <WhiteButton text='+ Add New Item' onClick={toggleText} />
            <WhiteButton text='Delete List' onClick={handleListDelete} />
          </>
        )}
      </AfterItemDiv>
    </AfterListDiv2>
  );
};
