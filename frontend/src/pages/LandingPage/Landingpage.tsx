import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container } from '../../components/index';
import house from '../../assets/house.jpg';
import lodgel from '../../assets/lodgel.jpg';
import {
  Footer,
  CenterImg,
  Wrapper,
  Nav,
  CTA,
  BigLogo,
  Logo,
  HeroContainer,
  Description,
  Screenshot,
  DescHeader,
} from './LandingPage.styling';

const Landing = (props: RouteComponentProps) => {
  return (
    <Container>
      {/* <DescHeader>A POS that helps you keep things clean</DescHeader> */}
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
      <HeroContainer>
        <DescHeader>Properties</DescHeader>
        <Description>
          <DescHeader>Manage your Properties</DescHeader>
          <p>
            This is one awesome description here! If you look at this, you will
            love the product right away. In fact, you want to invest in our
            company right way because of how awesome it is!
          </p>
        </Description>
        <Screenshot src={house} alt='house' />
      </HeroContainer>
      <HeroContainer>
        <DescHeader>Guests</DescHeader>
        <Description>
          <DescHeader>Keep Tabs on you Guests</DescHeader>
          <p>
            This is one awesome description here! If you look at this, you will
            love the product right away. In fact, you want to invest in our
            company right way because of how awesome it is!
          </p>
        </Description>
        <Screenshot src={house} alt='house' />
      </HeroContainer>
      <HeroContainer>
        <DescHeader>Assistants</DescHeader>
        <Description>
          <DescHeader>Coordinate your Assistants</DescHeader>
          <p>
            This is one awesome description here! If you look at this, you will
            love the product right away. In fact, you want to invest in our
            company right way because of how awesome it is!
          </p>
        </Description>
        <Screenshot src={house} alt='house' />
      </HeroContainer>
      <Footer>
        <a href='/'>
          <Logo src={lodgel} alt='Lodgel logo' />
        </a>
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
