import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { Button } from '../components/shared_components/index';
import house from '../assets/house.jpg';

const Container = styled('div')`
  /* background-color: gray; */
  padding: 20px;
`;

const Nav = styled('nav')`
  margin: 0 auto;
  padding: 20px;
  width: 50%;
  max-width: 880px;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    font-size: 2.1rem;
    color: black;
  }
`;

const Wrapper = styled('div')`
  margin: 0 auto;
  max-width: 70%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ButtonWrapper = styled('div')`
  /* border: 1px solid green; */
  padding-top: 60px;
  margin: 0 auto;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: 'Roboto';
  h2 {
    padding-top: 25px;
  }
`;

const CenterImg = styled('img')`
  max-height: 500px;
  max-width: 800px;
  border-radius: 100px;
`;

const AppHeader = styled('h1')`
  font-family: 'Staatliches', 'sans-serif';
`;

const SideHeader = styled('div')`
  font-family: 'Roboto';
  margin: 0 auto;
  padding: 15px;
  max-width: 20%;
`;

const Footer = styled('div')`
  display: flex;
  justify-content: space-around;
  position: fixed;
  padding-top: 20px;
  left: 0px;
  bottom: 0px;
  height: 10%;
  width: 100%;
  a {
    font-family: 'Roboto';
    font-size: 1.4rem;
    text-decoration: none;
    color: #3c3c3c;
  }
`;

const Landing = (props: RouteComponentProps) => {
  return (
    <div>
      <Container>
        <AppHeader>Cleaner POS</AppHeader>
        <h2>A POS that helps you keep things clean</h2>
        <Nav>
          <a href='/'>Home</a>
          <a href='/'>About</a>
          <a href='/'>Contact</a>
          <Link to='/Login'>
            <Button text='Sign In' />
          </Link>
        </Nav>
        <Wrapper>
          <SideHeader>
            <h2>Lorem Ipsum</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              semper quam hendrerit, vehicula ligula quis, ultrices nisl.
              Phasellus placerat in elit in mattis. Integer suscipit nulla
              tempor, tempus eros at, congue lectus.
            </p>
          </SideHeader>

          <CenterImg src={house} alt='Beautiful house with a pool' />

          <SideHeader>
            <h2>Lorem Ipsum</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              semper quam hendrerit, vehicula ligula quis, ultrices nisl.
              Phasellus placerat in elit in mattis. Integer suscipit nulla
              tempor, tempus eros at, congue lectus.
            </p>
          </SideHeader>
        </Wrapper>
        <ButtonWrapper>
          <Button
            text='Get started'
            onClick={() => {
              props.history.push('/Login');
            }}
          />
          <h2>Simplify managing your rental properties.</h2>
        </ButtonWrapper>
        <Footer>
          <a href='/'>POS</a>
          <a href='https://example.com'>Email</a>
          <a href='https://twitter.com'>Twitter</a>
          <a href='https://github.com/Lambda-School-Labs/labs9-cleaner-pos'>
            GitHub
          </a>
        </Footer>
      </Container>
	  <div> { Billing } </div>	
    </div>
  );
};

export default Landing;
