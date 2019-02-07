import React, { useState, useEffect, useReducer, useRef } from 'react';
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
  SecondaryText,
  IconButton,
  StyledTextField,
  ButtonGroup,
} from './PropertyDetails.styling';
import { TextField } from '@material-ui/core';
import loadingIndicator from '../utils/loading.svg';

export const PropertyLists = (props: ListProps) => {
  const [newItem, setNewItem] = useState('');
  const [inputItem, setInputItem] = useState(false);
  const [edit, setEdit] = useState(0);
  const [taskLoad, setTaskLoad] = useState(0);
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

  useEffect(() => {
    setTaskLoad(0);
  }, [props]);

  /* Submit and Cancel functions */
  const submitInput = (task: string, newItem: any, items_id: number) => () => {
    props.putTasks(task, newItem);
    setNewItem('');
    setTaskLoad(items_id);
    setEdit(0);
  };

  const cancelInput = () => {
    setEdit(0);
    setNewItem('');
  };
  /* Outside click detection
     Closes edit input field if user clicks outside of it
  */
  const newRef = useRef(null as any);
  const editRef = useRef(null as any);
  const changeOnOutsideClick = (
    ref: React.MutableRefObject<any>,
    cb: () => void,
  ) => (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      cb();
    }
  };

  const cancelInputOnClick = changeOnOutsideClick(editRef, cancelInput);
  const toggleTextOnClick = changeOnOutsideClick(newRef, toggleText);

  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
      cancelInputOnClick(event);
      toggleTextOnClick(event);
    });
    return () => {
      document.removeEventListener('mousedown', (event) => {
        cancelInputOnClick(event);
        toggleTextOnClick(event);
      });
    };
  });
  /* End of click detection */

  const renderListItem = (task: List) => {
    if (task.items_id === null) {
      return null;
    } else if (edit === task.items_id) {
      return (
        <div ref={editRef} className='task' key={task.items_id}>
          <StyledTextField value={newItem} onChange={handleChange} />
          <div className='icon-group'>
            <IconButton
              onClick={() => {
                props.putTasks(task, newItem);
                setNewItem('');
                setTaskLoad(task.items_id);
                setEdit(0);
              }}
            >
              <i className='fas fa-check' />
            </IconButton>
            <IconButton onClick={cancelInput}>
              <i className='fas fa-times' />
            </IconButton>
          </div>
        </div>
      );
    } else {
      return (
        <div className='task' key={task.items_id}>
          <SecondaryText
            onClick={() => {
              setEdit(task.items_id);
              setNewItem(task.task);
            }}
          >
            {task.items_id === taskLoad ? (
              <img src={loadingIndicator} alt='animated loading indicator' />
            ) : (
              task.task
            )}
          </SecondaryText>
          <span
            onClick={() => {
              props.deleteTasks(task.items_id);
              setTaskLoad(task.items_id);
            }}
          >
            <i className='fas fa-trash-alt trash' />
          </span>
        </div>
      );
    }
  };

  return (
    <ListDiv>
      <Header>{props.type}</Header>
      <ItemDiv>
        <TaskDiv>{props.list ? props.list.map(renderListItem) : null}</TaskDiv>
        {inputItem ? (
          <>
            <div ref={newRef} className='task'>
              <StyledTextField value={newItem} onChange={handleChange} />
              <div className='icon-group'>
                <IconButton onClick={handleNew}>
                  <i className='fas fa-check' />
                </IconButton>
                <IconButton onClick={toggleText}>
                  <i className='fas fa-times' />
                </IconButton>
              </div>
            </div>
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
  const [edit, setEdit] = useState(0);
  const [taskLoad, setTaskLoad] = useState(0);
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

  useEffect(() => {
    setTaskLoad(0);
  }, [props]);

  /* Submit and Cancel functions */
  const submitInput = (task: string, newItem: any, items_id: number) => () => {
    props.putTasks(task, newItem);
    setNewItem('');
    setTaskLoad(items_id);
    setEdit(0);
  };

  const cancelInput = () => {
    setEdit(0);
    setNewItem('');
  };
  /* Outside click detection
     Closes edit input field if user clicks outside of it
  */
  const newRef = useRef(null as any);
  const editRef = useRef(null as any);
  const changeOnOutsideClick = (
    ref: React.MutableRefObject<any>,
    cb: () => void,
  ) => (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      cb();
    }
  };

  const cancelInputOnClick = changeOnOutsideClick(editRef, cancelInput);
  const toggleTextOnClick = changeOnOutsideClick(newRef, toggleText);

  useEffect(() => {
    document.addEventListener('mousedown', (event) => {
      cancelInputOnClick(event);
      toggleTextOnClick(event);
    });
    return () => {
      document.removeEventListener('mousedown', (event) => {
        cancelInputOnClick(event);
        toggleTextOnClick(event);
      });
    };
  });
  /* End of click detection */

  const renderListItem = (task: List) => {
    console.log('items_id', task.items_id, 'task', task.task);
    if (task.items_id === null) {
      return null;
    } else if (edit === task.items_id) {
      return (
        <div ref={editRef} className='task' key={task.items_id}>
          <StyledTextField value={newItem} onChange={handleChange} />
          <div className='icon-group'>
            <IconButton
              onClick={() => {
                props.putTasks(task, newItem);
                setNewItem('');
                setTaskLoad(task.items_id);
                setEdit(0);
              }}
            >
              <i className='fas fa-check' />
            </IconButton>
            <IconButton onClick={cancelInput}>
              <i className='fas fa-times' />
            </IconButton>
          </div>
        </div>
      );
    } else {
      return (
        <div className='task' key={task.items_id}>
          <SecondaryText
            onClick={() => {
              setEdit(task.items_id);
              setNewItem(task.task);
            }}
          >
            {task.items_id === taskLoad ? (
              <img src={loadingIndicator} alt='animated loading indicator' />
            ) : (
              task.task
            )}
          </SecondaryText>
          <span
            onClick={() => {
              props.deleteTasks(task.items_id);
              setTaskLoad(task.items_id);
            }}
          >
            <i className='fas fa-trash-alt trash' />
          </span>
        </div>
      );
    }
  };

  return (
    <AfterListDiv2 data-testid='after-list'>
      <AfterHeader>{props.type}</AfterHeader>
      <AfterItemDiv>
        <TaskDiv>{props.list.map(renderListItem)}</TaskDiv>
        {inputItem ? (
          // <div>
          //   <TextField
          //     placeholder='Add New Item'
          //     required={true}
          //     value={newItem}
          //     onChange={handleChange}
          //   />
          //   <WhiteButton text='Submit' onClick={handleNew} />
          //   <WhiteButton text='Cancel' onClick={toggleText} />
          // </div>
          <div ref={newRef} className='task'>
            <StyledTextField
              placeholder='Add New Item'
              required={true}
              value={newItem}
              onChange={handleChange}
            />
            <div className='icon-group'>
              <IconButton onClick={handleNew}>
                <i className='fas fa-check' />
              </IconButton>
              <IconButton onClick={toggleText}>
                <i className='fas fa-times' />
              </IconButton>
            </div>
          </div>
        ) : (
          <ButtonGroup>
            <WhiteButton text='+ Add New Item' onClick={toggleText} />
            <WhiteButton
              className='delete'
              text='Delete List'
              onClick={handleListDelete}
            />
          </ButtonGroup>
        )}
      </AfterItemDiv>
    </AfterListDiv2>
  );
};
