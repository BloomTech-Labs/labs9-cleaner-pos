import React from 'react';
import { Button, Container } from '../../components/index';
import axios from 'axios';
import {
  HouseItem,
  CardBody,
  ThumbNail,
  CardContent,
  ButtonContainer,
  CardHeading,
  Cleaner,
  CheckList,
  HouseHeader,
} from './Properties.styling';
import { AxiosRequestConfig } from 'axios';
import { useFetch } from '../../helpers/';
import { House } from './types';
import { Link } from 'react-router-dom';

const Properties = () => {
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';
  /* Axios calls to fetch / update properties */
  const [houses, error, loading] = useFetch(`${url}/houses`);

  async function postAst(
    event: React.FormEvent<HTMLSelectElement>,
    id: number | undefined,
  ) {
    const token = localStorage.getItem('token');
    const headers: AxiosRequestConfig = {
      headers: { Authorization: token },
    };
    try {
      const [astId, fullName] = event.currentTarget.value.split(':');
      const res = await axios.put(
        `http://localhost:4500/houses/${id}`,
        {
          default_ast: Number(astId),
        },
        headers,
      );
    } catch (e) {
      throw e;
    }
  }
  // Presentational layer
  return (
    <Container>
      <HouseHeader>Recent Properties</HouseHeader>
      <Link to='/properties/new'>
        <Button text='New Property' />
      </Link>
      {loading ? '...Loading' : null}
      {error.error
        ? 'Whoops! There was an error loading this content for you ☹️'
        : null}
      {houses
        ? houses.map((house: House) => {
            return (
              <HouseItem key={house.id} data-testid='house-item'>
                <ThumbNail
                  src='https://www.samplemcdougald.org/wp-content/uploads/2017/10/visit-sample-mcdougald-300x300.jpg'
                  alt='house'
                />
                <CardContent>
                  <CardHeading>
                    <h4>{house.name}</h4>
                    <p>{house.address}</p>
                  </CardHeading>
                  <CardBody>
                    <CheckList>
                      <p>Checklist Items</p>
                      {house.checkList[0].count}
                    </CheckList>
                    <ButtonContainer>
                      <Link
                        to={{
                          pathname: `properties/${house.id}`,
                          hash: '#checklists',
                          state: house,
                        }}
                      >
                        <Button
                          text='Edit Checklists'
                          datatestid='house-button'
                        />
                      </Link>
                      <Link to={`/houses/${house.id}#resources`}>
                        <Button
                          text='Edit Resources'
                          datatestid='house-button'
                        />
                      </Link>
                    </ButtonContainer>
                    <Cleaner>
                      Default Cleaner
                      <select
                        data-testid='assistant-select'
                        onChange={(event) => postAst(event, house.id)}
                      >
                        <option defaultValue={house.default_ast_name}>
                          {house.default_ast}: {house.default_ast_name}
                        </option>
                        {house.openAst.map((ast: any) => {
                          if (ast.ast_id !== house.default_ast) {
                            return (
                              <option key={ast.ast_id}>
                                {ast.ast_id}: {ast.full_name}
                              </option>
                            );
                          }
                        })}
                      </select>
                    </Cleaner>
                  </CardBody>
                </CardContent>
              </HouseItem>
            );
          })
        : null}
    </Container>
  );
};

export default Properties;
