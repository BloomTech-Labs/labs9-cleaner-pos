import React from 'react';
import { Button, Container } from '../../components/index';
import { useFetch } from '../../helpers/';
import { Link } from 'react-router-dom';
import img from '../assets/ronald.jpg';
import loadingIndicator from '../utils/loading.svg';
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
      <Link
        style={{ marginBottom: `2rem` }}
        to={`/assistants/${assistant.ast_id}`}
      >
        <AssistantItem data-testid='assistant-item'>
          <ThumbNail className='list-img' src={img} alt={assistant.full_name} />
          <CardBody>
            <CardHeading>
              <h1>{assistant.full_name}</h1>
              <p>Test Address</p>
            </CardHeading>
            <div className='check-boxes'>
              <CheckList>
                <p>Checklist Items</p>
                <div className='secondary'>{assistant.itemCount}</div>
              </CheckList>
              <Asst>
                <p>Available Houses</p>
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
      {loading ? (
        <img src={loadingIndicator} alt='animated loading indicator' />
      ) : null}
      {error.error ? 'Whoops! Something went wrong! :(' : null}
      <>
        <HeaderWrapper>
          <AssistantHeader>Turnover Assistants</AssistantHeader>
          <Link to='/invite'>
            <Button text='+ New Assistant' />
          </Link>
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
