import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, LeafletMap } from '../../components/index';
import {
  AssistantBar,
  AsstDetail,
  AsstProperty,
  ThumbNail,
} from './Assistants.styling';
import axios, { AxiosRequestConfig } from 'axios';

interface AssistantsEnum extends Array<Assistant> {}

interface Assistant {
  id?: number;
  user_id: string;
  address: any;
}

const token = localStorage.getItem('token');

const header: AxiosRequestConfig = {
  headers: { Authorization: token },
};

const AssistantCard = (assistant: any) => {
  return (
    <AssistantBar key={assistant.id}>
      <ThumbNail src='../assets/ronald.jpg' alt='Ronald' />
      <AsstDetail>
        <h2>{assistant.full_name}</h2>
        <h3>{assistant.address}</h3>
      </AsstDetail>
      <AsstProperty>
        <h2>Default Properties</h2>
        <Button text='+ Add New Item' />
      </AsstProperty>
      <AsstProperty>
        <h2>Available Properties</h2>
        <Button text='+ Add New Item' />
      </AsstProperty>
    </AssistantBar>
  );
};

const AssistantsDetails = (assistant: any) => {
  const [assistants, setAssistants] = useState<AssistantsEnum>([]);
  const shouldFetch = useRef(true);
  async function fetchAssistants() {
    try {
      {
        /* May need to make another endpoint to pull assistants by ID */
      }
      const res = await axios.get(
        'https://cleaner-pos.herokuapp.com/assistants',
        header,
      );
      setAssistants(res.data);
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    fetchAssistants();
    shouldFetch.current = false;
  }, [shouldFetch]);

  return (
    <Container>
      <AssistantCard />
      <LeafletMap />
    </Container>
  );
};

export default AssistantsDetails;
