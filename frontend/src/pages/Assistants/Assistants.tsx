import React, { useState, useRef, useEffect } from 'react';
import { Button, Container } from '../../components/index';
import { useFetch } from '../../helpers/';
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

const AssistantCard = (assistant: any) => {
  const [data, error, loading] = useFetch(
    `https://cleaner-pos.herokuapp.com/houses/${assistant.ast_id}?user=true`,
  );

  let checkList = 0;
  if (data) {
    checkList = data.reduce((acc: number, obj: any) => {
      const checkLists = obj.checkList;
      const count = checkLists.reduce((acc2: number, inObj: any) => {
        return acc2 + inObj.count;
      }, 0);
      return acc + count;
    }, 0);
  }

  return (
    <AssistantItem key={assistant.ast_id} data-testid='assistant-item'>
      <CardContent>
        <CardHeading>
          <div>{assistant.full_name}</div>
        </CardHeading>
        <CardBody>
          <ThumbNail src='../assets/ronald.jpg' alt='' />
          <CheckList>
            <h3>Checklist Items</h3>
            <div>{checkList ? checkList : null}</div>
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
  const [data, error, loading] = useFetch(
    'https://cleaner-pos.herokuapp.com/assistants',
  );
  return (
    <Container>
      <HeaderWrapper>
        <AssistantHeader>Turnover Assistants</AssistantHeader>
        <Button text='+ New Assistant' />
      </HeaderWrapper>
      {data ? data.map(AssistantCard) : null}
    </Container>
  );
};

export default Assistants;
