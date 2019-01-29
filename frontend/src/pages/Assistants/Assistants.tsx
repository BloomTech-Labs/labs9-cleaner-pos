import React from 'react';
import { Button, Container } from '../../components/index';
import { useFetch } from '../../helpers/';
import { Link } from 'react-router-dom';
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
  process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';

const AssistantCard = (assistant: any) => {
  return (
    <>
      <AssistantItem key={assistant.user_id} data-testid='assistant-item'>
        <Link to={`/assistants/${assistant.ast_id}`}>
          <CardContent>
            <CardHeading>
              <div>{assistant.full_name}</div>
            </CardHeading>
            <CardBody>
              <ThumbNail src='../assets/ronald.jpg' alt='' />
              <CheckList>
                <h3>Checklist Items</h3>
                <div>{assistant.itemCount}</div>
              </CheckList>
              <Asst>
                <h3>Available Houses</h3>
                <div>{assistant.houseCount}</div>
              </Asst>
              <ButtonContainer>
                <Button
                  text='House Availability'
                  datatestid='assistant-button'
                />
              </ButtonContainer>
            </CardBody>
          </CardContent>
        </Link>
      </AssistantItem>
    </>
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
      {loading ? '...Loading' : null}
      {error.error ? 'Whoops! Something went wrong! :(' : null}
      {data ? data.map(AssistantCard) : null}
    </Container>
  );
};

export default Assistants;
