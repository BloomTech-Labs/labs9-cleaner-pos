import React from 'react';
import { Lists, List, ListProps } from './types';
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
import { Container, Button } from '../../components/index';
import styled from '@emotion/styled';

export const PropertyLists = (props: ListProps) => {
  console.log(props);
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
        <WhiteButton text='+ Add New Item' />
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
