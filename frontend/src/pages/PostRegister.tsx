import React, { useState } from 'react';
import { RouteProps } from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';

const PostRegister = (props: RouteProps) => {
  const [email, setEmail] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Please enter your email address</label>
      <input
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Please enter your email address'
      />
      <label>Please enter your address</label>
      <input
        name='street_address'
        value={streetAddress}
        onChange={(e) => setStreetAddress(e.target.value)}
        placeholder='Please enter your address address'
      />
      <label>Please enter your address</label>
      <input
        name='city'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder='City'
      />
    </form>
  );
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const headers: AxiosRequestConfig = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };
      const userData = {
        address: streetAddress + city,
        email,
      };
      const res = await axios.put(
        'https://cleaner-pos.herokuapp.com/users/',
        userData,
        headers,
      );
    } catch (e) {
      throw e;
    }
  }
};

export default PostRegister;
