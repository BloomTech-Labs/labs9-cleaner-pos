import React, { useState } from 'react';
// Components
import Button from '../../components/Button';
// Types
import { ChecklistsData, ListTypes } from './types';
import { useFetch } from '../../helpers';

// Styling & Assets
import loadingIndicator from '../utils/loading.svg';

const ChecklistView = (props: {
  lists: ChecklistsData;
  errors: { msg: string; error: boolean };
  listFilter: ListTypes;
  setListFilter: (listType: ListTypes) => void;
  className?: string;
}) => {
  if (!props.lists) {
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
  }) => {
    const { task, complete, items_id } = itemProps;
    return (
      <div key={items_id}>
        <input
          type='checkbox'
          name={task}
          checked={complete}
          readOnly
          data-testid={'checkbox'}
        />
        <label htmlFor={task} onClick={() => 'hello'}>
          {task}
        </label>
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
          buffer.push(<div key={list}>{list}</div>);
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
      <div className='top'>
        <div className='guests-buttons-filter'>
          <Button
            className={`button-filter before ${activeClass('before')}`}
            text='Before'
            colour='var(--colour-accent)'
            onClick={() => setListFilter('before')}
            datatestid='button-before'
          />
          <Button
            className={`button-filter during ${activeClass('during')}`}
            text='During'
            colour='var(--colour-accent)'
            onClick={() => setListFilter('during')}
            datatestid='button-during'
          />
          <Button
            className={`button-filter after ${activeClass('after')}`}
            text='After'
            colour='var(--colour-accent)'
            onClick={() => setListFilter('after')}
            datatestid='button-after'
          />
        </div>
        <div className='top-left'>{listFilter} Checklist</div>
        <div className='top-right'>{percentage}%</div>
        <br />
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
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

  const [lists, error] = useFetch(`${url}/lists/${props.stayId}?stay=true`);

  const setFilterForList = (listType: ListTypes) => {
    setListFilter(listType);
  };

  return (
    <ChecklistView
      className={props.className}
      lists={lists}
      listFilter={listFilter}
      setListFilter={setFilterForList}
      errors={error}
    />
  );
};
