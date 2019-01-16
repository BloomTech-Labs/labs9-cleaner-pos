import React, { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

import { Container, Button } from '../../components/shared_components';

const Settings = () => {
  // useState returns an array. first element is the value, second element is a setState function
  const [settings, setSettings] = useState({
    setting_email: false,
    setting_text: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setSettings((prev) => ({ ...prev, [target.name]: target.checked }));
  };

  useEffect(() => {
    const headers: AxiosRequestConfig = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    const url =
      process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

    axios
      .get(`${url}/users`, headers)
      .then(({ data }) => {
        console.log(data);
        const { setting_email, setting_text } = data;
        setSettings({
          setting_email,
          setting_text,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Container>
      <Button text='Update Contact' />
      <input
        type='checkbox'
        name='setting_email'
        checked={settings.setting_email}
        onChange={handleInputChange}
      />{' '}
      I would like to receive updates via email.
      <br />
      <input
        type='checkbox'
        name='setting_text'
        checked={settings.setting_text}
        onChange={handleInputChange}
      />{' '}
      I would like to receive updates via text.
      <br />
      <Button text='Save' />
    </Container>
  );
};

export default Settings;
