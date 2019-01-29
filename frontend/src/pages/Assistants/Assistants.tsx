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

interface AssistantsEnum extends Array<Assistant> {}

interface Assistant {
  user_id: number;
  ast_id: number;
  itemCount: number;
  houseCount: number;
  house_id: number;
  full_name: string;
}

const AssistantCard = (assistant: Assistant) => {
  return (
    <>
      <Link to={`/assistants/${assistant.ast_id}`}>
        <AssistantItem data-testid='assistant-item'>
          <ThumbNail src={img} alt={assistant.full_name} />
          <CardHeading>
            <h1>{assistant.full_name}</h1>
          </CardHeading>
          <CardBody>
            <CheckList>
              <h3>Checklist Items</h3>
              <div>{assistant.itemCount}</div>
            </CheckList>
            <Asst>
              <h3>Available Houses</h3>
              <div>{assistant.houseCount}</div>
            </Asst>
            <ButtonContainer>
              <Button text='House Availability' datatestid='assistant-button' />
            </ButtonContainer>
          </CardBody>
        </AssistantItem>
      </Link>
    </>
  );
};

const Assistants = () => {
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';
  const [data, error, loading] = useFetch(
    'https://cleaner-pos.herokuapp.com/assistants',
  );
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
