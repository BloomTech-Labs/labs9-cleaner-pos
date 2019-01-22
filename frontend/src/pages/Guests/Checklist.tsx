import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { axiosErrorHandler } from '../utils';
// Types
import { ChecklistsData } from './types';
import { listenerCount } from 'cluster';
import { RouteComponentProps } from 'react-router';

const ChecklistView = (props: {
  lists: ChecklistsData;
  errors: { msg: string; error: boolean };
  className?: string;
}) => {
  if (!props.lists.before) {
    return <div>⌛</div>;
  }

  // TODO: Refine error message
  if (props.errors.error) {
    return <div>{props.errors.msg}</div>;
  }

  const CheckItem = (itemProps: { task: string; items_id: number }) => {
    return <div>{itemProps.task}</div>;
  };

  return (
    <div className={props.className || ''}>
      {props.lists.before.map((item) => (
        <CheckItem key={item.items_id} {...item} />
      ))}
    </div>
  );
};

export const Checklist = (props: { stayId: number; className?: string }) => {
  const [lists, setLists] = useState({} as ChecklistsData);
  const [errors, setErrors] = useState({ msg: '', error: false });

  useEffect(
    () => {
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
        process.env.REACT_APP_backendURL ||
        'https://cleaner-pos.herokuapp.com/';

      console.log('full url:', `${url}/lists/${props.stayId}?stay=true`);
      axios
        .get(`${url}/lists/${props.stayId}?stay=true`, headers)
        .then((response) => {
          const { data } = response;
          setLists(data);
          setErrors((prev) => ({ ...prev, error: false }));
        })
        .catch(axiosErrorHandler(setErrors));
    },
    [props.stayId],
  );

  return (
    <ChecklistView className={props.className} lists={lists} errors={errors} />
  );
};
