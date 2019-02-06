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
  SectionHeader,
  DescHeader,
  DescContainer,
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
        <DescContainer>
          <SectionHeader>Properties</SectionHeader>
          <Description>
            <DescHeader>Manage your Properties</DescHeader>
            <p>
              A detailed view for each of your properties is at your fingertips.
              You have the freedom to add and remove properties as your
              portfolio changes over time, which keeps complete control of
              how your properties are managed in your hands.
            </p>
          </Description>
        </DescContainer>
        <Screenshot src={house} alt='house' />
      </HeroContainer>
      <HeroContainer>
        <SectionHeader>Guests</SectionHeader>
        <Description>
          <DescHeader>Keep Tabs on you Guests</DescHeader>
          <p>
            Your guests are the heart of your business. To help you deliver the
            high-quality service that your guests deserve, we have created customizable
            checklists that ensure all of your guests' needs are met.
          </p>
        </Description>
        <Screenshot src={house} alt='house' />
      </HeroContainer>
      <HeroContainer>
        <SectionHeader>Assistants</SectionHeader>
        <Description>
          <DescHeader>Coordinate your Assistants</DescHeader>
          <p>
            Your time is valuable, and managing multiple properties can be stressful.
            Assistants can be invaluable in exceeding guest expectations, and can be your
            hands when you are needed elsewhere. Assign an assistant to take care of
            a property by default, and watch in real time as they complete their tasks.
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
