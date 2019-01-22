import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
// Types
import { ChecklistsData } from './types';
import { listenerCount } from 'cluster';

const ChecklistView = (props: {
  lists: ChecklistsData;
  className?: string;
}) => {
  const { className } = props;

  const CheckItem = (itemProps: { task: string; items_id: number }) => {
    return <div>{itemProps.task}</div>;
  };

  return (
    <div className={className}>
      {props.lists.before.map((item) => (
        <CheckItem {...item} />
      ))}
    </div>
  );
};

export const Checklist = () => {
  const [lists, setLists] = useState({} as ChecklistsData);
  const [errors, setErrors] = useState({ msg: '', error: false });

  useEffect(() => {
    // TODO: Figure out how to extend RouteComponentPros with params.id
    // @ts-ignore
    const id = props.match.params.id;
    const token = localStorage.getItem('token');

    if (!token) {
      setErrors({
        msg: 'Authentication error. Please try logging in again.',
        error: true,
      });
      return;
    }

    const headers: AxiosRequestConfig = {
      headers: { Authorization: token },
    };

    const url =
      process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com/';

    axios
      .get(`${url}/lists/${id}?stay=true`, headers)
      .then((response) => {
        const { data } = response;
        setLists(data);
      })
      .catch(axiosErrorHandler(setErrors));
  }, []);
  return <ChecklistView lists={lists} />;
};
