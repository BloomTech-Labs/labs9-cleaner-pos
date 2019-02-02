import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Components
import Button from '../../components/Button';
// Types
import { ChecklistsData, ListTypes } from './types';
import { axiosFetch, useFetch } from '../../helpers';

// Styling & Assets
import loadingIndicator from '../utils/loading.svg';
import { async } from 'q';

const ChecklistView = (props: {
  errors: { msg: string; error: boolean };
  loading: boolean;
  lists: ChecklistsData;
  listFilter: ListTypes;
  setListFilter: (listType: ListTypes) => void;
  setComplete: (
    itemId: number,
    stayId: number,
  ) => (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => Promise<void>;
  className?: string;
}) => {
  if (props.lists === undefined) {
    console.error('props', props);
    return (
      <div>
        <img src={loadingIndicator} alt='animated loading indicator' />
      </div>
    );
  }

  // TODO: Refine error message
  if (props.errors.error) {
    return <div>{props.errors.msg}</div>;
  }

  const CheckItem = (itemProps: {
    task: string;
    complete: boolean;
    items_id: number;
    stay_id: number;
  }) => {
    const { task, complete, items_id, stay_id } = itemProps;
    return (
      <div
        className='list-checkbox pretty p-default p-round p-smooth'
        key={items_id}
      >
        <input
          type='checkbox'
          name={task}
          checked={complete}
          onClick={props.setComplete(items_id, stay_id)}
          readOnly
          disabled={props.loading}
          data-testid={'checkbox'}
        />
        <div className='state p-primary-o'>
          <label htmlFor={task} onClick={() => 'hello'}>
            {task}
          </label>
        </div>
      </div>
    );
  };

  const { lists, listFilter, setListFilter } = props;
  let total = 0;
  let completed = 0;

  for (const item of lists[listFilter]) {
    total++;
    if (item.complete) {
      completed++;
    }
  }
  const percentage: number = (completed / total) * 100 || 0;

  const activeClass = (filter: ListTypes) =>
    listFilter === filter ? 'active' : '';

  const parseAfterLists = () => {
    const buffer: JSX.Element[] = [];

    lists.after.map((obj, i) => {
      for (const list in obj) {
        if (obj.hasOwnProperty(list)) {
          buffer.push(
            <div className='sublist' key={list}>
              {`${list[0].toLocaleUpperCase()}${list.substring(1)}`}
            </div>,
          );
          obj[list].forEach((item) => {
            buffer.push(<CheckItem key={item.items_id} {...item} />);
          });
          buffer.push(<br key={i} />);
        }
      }
    });

    return buffer;
  };

  return (
    <div className={props.className || ''}>
      <div className='guests-buttons-filter'>
        <Button
          className={`button-filter before ${activeClass('before')}`}
          text='Before'
          color='var(--color-text-accent)'
          onClick={() => setListFilter('before')}
          datatestid='button-before'
        />
        <Button
          className={`button-filter during ${activeClass('during')}`}
          text='During'
          color='var(--color-text-accent)'
          onClick={() => setListFilter('during')}
          datatestid='button-during'
        />
        <Button
          className={`button-filter after ${activeClass('after')}`}
          text='After'
          color='var(--color-text-accent)'
          onClick={() => setListFilter('after')}
          datatestid='button-after'
        />
      </div>
      <br />
      <div className='progress-no'>
        Completion Progress: <span>{percentage}%</span>
      </div>
      {listFilter === 'before' || listFilter === 'during'
        ? lists[listFilter].map((item) => (
            <CheckItem key={item.items_id} {...item} />
          ))
        : parseAfterLists()}
    </div>
  );
};

export const Checklist = (props: { stayId: number; className?: string }) => {
  const [listFilter, setListFilter] = useState('before' as ListTypes);
  const [fetch, setFetch] = useState(false);

  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

  const [lists, error, loading] = useFetch(
    `${url}/lists/${props.stayId}?stay=true`,
    fetch,
  );

  const setFilterForList = (listType: ListTypes) => {
    setListFilter(listType);
  };

  const setComplete = (itemId: number, stayId: number) => async () => {
    const [receivedData, sendError] = await axiosFetch(
      'post',
      `${url}/itemComplete`,
      {
        item_id: itemId,
        stay_id: stayId,
      },
    );

    setFetch((prev) => !prev);
  };

  return lists ? (
    <ChecklistView
      className={props.className}
      loading={loading}
      lists={lists}
      listFilter={listFilter}
      setListFilter={setFilterForList}
      setComplete={setComplete}
      errors={error}
    />
  ) : null;
};
