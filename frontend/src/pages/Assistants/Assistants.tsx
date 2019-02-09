import React from 'react';
import { Button, Container } from '../../components/index';
import { useFetch } from '../../helpers/';
import { Link } from 'react-router-dom';
import loadingIndicator from '../utils/loading.svg';
import {
  AssistantItem,
  CardBody,
  ThumbNail,
  ButtonContainer,
  CardHeading,
  InfoBox,
  AssistantHeader,
  HeaderWrapper,
} from './Assistants.styling';
import { Assistant } from './types';
// Assets
import defaultUser from '../../assets/default-user.jpg';

interface AssistantsEnum extends Array<Assistant> {}

const AssistantCard = (assistant: Assistant) => {
  const imgFile = assistant.photo_url || defaultUser;

  return (
    <>
      <AssistantItem data-testid='assistant-item'>
        <ThumbNail
          className='list-img'
          src={imgFile}
          alt={assistant.full_name}
        />
        <CardBody>
          <CardHeading>
            <h1>{assistant.full_name}</h1>
            <p>
              {assistant.address && assistant.address.split('\n')[0]}
              {', '}
              {assistant.address && assistant.address.split('\n')[2]}
            </p>
          </CardHeading>
          <div className='check-boxes'>
            <InfoBox>
              <p>Checklist Items</p>
              <div className='secondary'>{assistant.itemCount}</div>
            </InfoBox>
            <InfoBox>
              <p>Available Houses</p>
              <div className='secondary'>{assistant.houseCount}</div>
            </InfoBox>
            <ButtonContainer>
              <Link to={`/assistants/${assistant.ast_id}`}>
                <Button
                  className='button__see-more'
                  text='See More'
                  datatestid='assistant-button'
                />
              </Link>
            </ButtonContainer>
          </div>
        </CardBody>
      </AssistantItem>
    </>
  );
};

const Assistants = () => {
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';
  const [data, error, loading] = useFetch(`${url}/assistants`);
  return (
    <Container>
      {error.error ? 'Whoops! Something went wrong! :(' : null}
      <>
        <HeaderWrapper>
          <AssistantHeader>Turnover Assistants</AssistantHeader>
          <Link to='/invite'>
            <Button text='+ New Assistant' className='new-ast__button' />
          </Link>
        </HeaderWrapper>
        <div
          role='alert'
          aria-live='assertive'
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {loading ? (
            <img src={loadingIndicator} alt='animated loading indicator' />
          ) : data ? (
            data.map((assistant: Assistant) => (
              <AssistantCard key={assistant.ast_id} {...assistant} />
            ))
          ) : null}
          <p style={{ display: 'none' }}>Content is loading...</p>
        </div>
      </>
    </Container>
  );
};

export default Assistants;
