import React from 'react';
import { Button, Container } from '../../components/index';
import { useFetch } from '../../helpers/';
import { Link } from 'react-router-dom';
import img from '../assets/ronald.jpg';
import {
  AssistantItem,
  CardBody,
  ThumbNail,
  ButtonContainer,
  CardHeading,
  Asst,
  CheckList,
  AssistantHeader,
  HeaderWrapper,
} from './Assistants.styling';
import { Assistant } from './types';

interface AssistantsEnum extends Array<Assistant> {}

const AssistantCard = (assistant: Assistant) => {
  return (
    <>
      <Link to={`/assistants/${assistant.ast_id}`}>
        <AssistantItem data-testid='assistant-item'>
          <ThumbNail src={img} alt={assistant.full_name} />
          <CardBody>
            <CardHeading>
              <h1>{assistant.full_name}</h1>
              <h3>Test Address</h3>
            </CardHeading>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <CheckList>
                <h3>Checklist Items</h3>
                <div className='secondary'>{assistant.itemCount}</div>
              </CheckList>
              <Asst>
                <h3>Available Houses</h3>
                <div className='secondary'>{assistant.houseCount}</div>
              </Asst>
              <ButtonContainer>
                <Button text='See More' datatestid='assistant-button' />
              </ButtonContainer>
            </div>
          </CardBody>
        </AssistantItem>
      </Link>
    </>
  );
};

const Assistants = () => {
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';
  const [data, error, loading] = useFetch(`${url}/assistants`);
  return (
    <Container>
      {loading ? '...Loading' : null}
      {error.error ? 'Whoops! Something went wrong! :(' : null}
      <>
        <HeaderWrapper>
          <AssistantHeader>Turnover Assistants</AssistantHeader>
          <Button text='+ New Assistant' />
        </HeaderWrapper>
        {data
          ? data.map((assistant: Assistant) => (
              <AssistantCard key={assistant.ast_id} {...assistant} />
            ))
          : null}
      </>
    </Container>
  );
};

export default Assistants;
