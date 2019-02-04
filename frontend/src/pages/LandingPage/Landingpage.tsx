import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container } from '../../components/index';
import house from '../../assets/house.jpg';
import lodgel from '../../assets/lodgel.png';
import {
  Footer,
  AppHeader,
  CenterImg,
  Wrapper,
  Nav,
  CTA,
  BigLogo,
  Logo,
} from './LandingPage.styling';

const Landing = (props: RouteComponentProps) => {
  return (
    <Container>
      {/* <h2>A POS that helps you keep things clean</h2> */}
      <Nav>
        <BigLogo src={lodgel} alt='Lodgel logo' />
        <Link to='/Login'>
          <Button text='Sign In' />
        </Link>
      </Nav>

      <Wrapper>
        <CenterImg src={house} alt='Beautiful house with a pool' />
      </Wrapper>
      <CTA>
        <Button
          text='Get started'
          onClick={() => {
            props.history.push('/Login');
          }}
        />
        <h2>Simplify managing your rental properties.</h2>
      </CTA>
        <Footer>
          <a href='/'><Logo src={lodgel} alt='Lodgel logo' /></a>
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
