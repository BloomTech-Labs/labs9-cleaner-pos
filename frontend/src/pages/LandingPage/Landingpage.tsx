import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container } from '../../components/index';
import house from '../../assets/house.jpg';
import {
  Footer,
  SideHeader,
  AppHeader,
  CenterImg,
  Wrapper,
  Nav,
} from './LandingPage.styling';

const Landing = (props: RouteComponentProps) => {
  return (
    <Container>
      <AppHeader>Lodgel</AppHeader>
      {/* <h2>A POS that helps you keep things clean</h2> */}
      <Nav>
        <a href='/'>Home</a>
        <a href='/'>About</a>
        <a href='/'>Contact</a>
        <Link to='/Login'>
          <Button text='Sign In' />
        </Link>
      </Nav>
      <Wrapper>
        {/* <SideHeader>
          <h2>Lorem Ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper
            quam hendrerit, vehicula ligula quis, ultrices nisl. Phasellus
            placerat in elit in mattis. Integer suscipit nulla tempor, tempus
            eros at, congue lectus.
          </p>
        </SideHeader> */}

        <CenterImg src={house} alt='Beautiful house with a pool' />

        {/* <SideHeader>
          <h2>Lorem Ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed semper
            quam hendrerit, vehicula ligula quis, ultrices nisl. Phasellus
            placerat in elit in mattis. Integer suscipit nulla tempor, tempus
            eros at, congue lectus.
          </p>
        </SideHeader> */}
      </Wrapper>
      <h2>Simplify managing your rental properties.</h2>
      <Button
        text='Get started'
        onClick={() => {
          props.history.push('/Login');
        }}
      />
      <Footer>
        <a href='/'>POS</a>
        <a href='https://example.com'>Email</a>
        <a href='https://twitter.com'>Twitter</a>
        <a href='https://github.com/Lambda-School-Labs/labs9-cleaner-pos'>
          GitHub
        </a>
      </Footer>
    </Container>
  );
};

export default Landing;
