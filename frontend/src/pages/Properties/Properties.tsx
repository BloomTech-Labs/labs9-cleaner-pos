import React, { useContext } from 'react';
import { Button, Container } from '../../components/index';
import axios from 'axios';
import {
  PropContainer,
  HouseItem,
  CardBody,
  ThumbNail,
  CardContent,
  ButtonContainer,
  CardHeading,
  Assistant,
  CheckList,
  HouseHeader,
} from './Properties.styling';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import { AxiosRequestConfig } from 'axios';
import { useFetch } from '../../helpers/';
import { House } from './types';
import { Link } from 'react-router-dom';
import loadingIndicator from '../utils/loading.svg';
import { UserContext } from '../../App';
import defaultHouse from '../../assets/house_alt.jpg';
// Original Url: https://www.samplemcdougald.org/wp-content/uploads/2017/10/visit-sample-mcdougald-300x300.jpg

const Properties = () => {
  const url =
    process.env.REACT_APP_backendURL || 'https://cleaner-pos.herokuapp.com';
  /* Axios calls to fetch / update properties */
  const [houses, error, loading] = useFetch(`${url}/houses`);
  const { subscription } = useContext(UserContext);
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  // Snackbar functions
  function openSnackBar() {
    setSnackbarOpen(true);
  }

  function handleClose(event: any, reason: string) {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  }

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
      openSnackBar();
    } catch (e) {
      throw e;
    }
  }
  // Presentational layer
  return (
    <Container>
      <PropContainer>
        <div className='properties-header'>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={
              <span id='message-id'>Assistant successfully updated.</span>
            }
            action={[
              <IconButton
                key='close'
                aria-label='Close'
                color='inherit'
                // @ts-ignore
                onClick={handleClose}
              >
                <i className='fas fa-times' />
              </IconButton>,
            ]}
          />
          <HouseHeader>Recent Properties</HouseHeader>
          {}
          <Link
            to='/properties/new'
            // @ts-ignore
            onClick={
              subscription === 0 && houses && houses.length >= 3
                ? (e) => e.preventDefault()
                : null
            }
          >
            <Button text='New Property' />
          </Link>
        </div>
        {loading ? (
          <img src={loadingIndicator} alt='animated loading indicator' />
        ) : null}
        {error.error
          ? 'Whoops! There was an error loading this content for you ☹️'
          : null}
        {houses && subscription === 0 && houses.length >= 3 ? (
          <div
            style={{
              marginTop: '24px',
              marginBottom: '24px',
              color: 'var(--color-text-accent)',
              border: 'var(--border)',
              padding: '20px',
              backgroundColor: 'var(--color-bg-secondary)',
            }}
          >
            <h2>
              You've reached the maximum amount of properties. Please subscribe
              to add more.
            </h2>
            <Link to='/billing'>
              <Button text='Subscribe' />
            </Link>
          </div>
        ) : null}
        {houses
          ? houses.map((house: House) => {
              return (
                <HouseItem key={house.id} data-testid='house-item'>
                  <ThumbNail src={defaultHouse} alt='house' />
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
                            className='property-button'
                            text='Edit Checklists'
                            datatestid='house-button'
                          />
                        </Link>
                        <Link to={`/houses/${house.id}#resources`}>
                          <Button
                            className='property-button'
                            text='Edit Resources'
                            datatestid='house-button'
                          />
                        </Link>
                      </ButtonContainer>
                      <Assistant>
                        <label>Default Assistant</label>
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
                      </Assistant>
                    </CardBody>
                  </CardContent>
                </HouseItem>
              );
            })
          : null}
      </PropContainer>
    </Container>
  );
};

export default Properties;
