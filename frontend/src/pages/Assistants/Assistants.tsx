import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { Button, Container, SpecialButton } from '../../components/index';
import axios, { AxiosRequestConfig } from 'axios';
import {
  AssistantItem,
  CardBody,
  ThumbNail,
  CardContent,
  ButtonContainer,
  CardHeading,
  Asst,
  CheckList,
  AssistantHeader,
  HeaderWrapper,
} from './Assistants.styling';

interface AssistantsEnum extends Array<Assistant> {}

interface Assistant {
  id?: number;
  user_id: string;
  openAst: any;
  house_id: any;
}
const url =
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com/';

const token = localStorage.getItem('token');

const header: AxiosRequestConfig = {
  headers: { Authorization: token },
};

const AssistantCard = (assistant: any) => {
  const [itemCount, setItemCount] = useState(0);
  useEffect(() => {
    axios
      .get(`${url}houses/${assistant.ast_id}?user=true`, header)
      .then((res) => {
        // console.log(res.data);
        const checkList: number = res.data.reduce((acc: number, obj: any) => {
          const checkLists = obj.checkList;
          const count = checkLists.reduce((acc2: number, inObj: any) => {
            return acc2 + inObj.count;
          }, 0);
          return acc + count;
        }, 0);
        // console.log(checkList);
        setItemCount(checkList);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  return (
    <AssistantItem key={assistant.id} data-testid='assistant-item'>
      <CardContent>
        <CardHeading>
          <div>{assistant.full_name}</div>
        </CardHeading>
        <CardBody>
          <ThumbNail src='../assets/ronald.jpg' alt='' />
          <CheckList>
            <h3>Checklist Items</h3>
            <div>{itemCount}</div>
          </CheckList>
          <Asst>
            <h3>Available Houses</h3>
            <div>{assistant.openAst.length}</div>
          </Asst>
          <ButtonContainer>
            <Button text='House Availability' datatestid='assistant-button' />
          </ButtonContainer>
        </CardBody>
      </CardContent>
    </AssistantItem>
  );
};

const Assistants = () => {
  const [assistants, setAssistants] = useState<AssistantsEnum>([]);
  const shouldFetch = useRef(true);

  async function fetchAssistants() {
    try {
      const res = await axios.get(`${url}assistants`, header);
      setAssistants(res.data);
      // console.log(res.data);
    } catch (e) {
      throw e;
    }
  }

  useEffect(
    () => {
      fetchAssistants();
      shouldFetch.current = false;
    },
    [shouldFetch],
  );

  return (
    <Container>
      <HeaderWrapper>
        <AssistantHeader>Turnover Assistants</AssistantHeader>
        <Button text='+ New Assistant' />
      </HeaderWrapper>
      {assistants.map(AssistantCard)}
    </Container>
  );
};

export default Assistants;
