import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container } from '../../components/index';
import house from '../../assets/house_alt.jpg';
import lodgel from '../../assets/lodgel.jpg';
import notxt_Lodgel from '../../assets/notxt_Lodgel.jpg';
import {
  Footer,
  CenterImg,
  Wrapper,
  Nav,
  CTA,
  BigLogo,
  Logo,
  Icon,
  HeroContainer,
  Description,
  Screenshot,
  SectionHeader,
  DescHeader,
  DescContainer,
  IconContainer,
} from './LandingPage.styling';

const Landing = (props: RouteComponentProps) => {
  const { loggedIn } = useContext(UserContext);
  return (
    <Container>
      {/* <DescHeader>A POS that helps you keep things clean</DescHeader> */}
      <Nav>
        <BigLogo src={lodgel} alt='Lodgel logo' />
        {loggedIn ? (
          <Link to='/properties'>
            <Button text='Dashboard' color='var(--color-accent)' />
          </Link>
        ) : (
          <Link to='/Login'>
            <Button text='Sign In' color='var(--color-accent)' />
          </Link>
        )}
      </Nav>

      <Wrapper>
        <CenterImg src={house} alt='Beautiful house with a pool' />
      </Wrapper>
      <CTA>
        <Button
          text='Get started'
          color='var(--color-accent)'
          onClick={() => {
            props.history.push('/Login');
          }}
        />
        <h2>Simplify Managing Your Rental Properties.</h2>
      </CTA>
      <HeroContainer>
        <DescContainer>
          <Description>
            <DescHeader>Welcome To Lodgel</DescHeader>
            <p>
              Lodgel is designed to take the hassle out of out of your property
              management experience. You can quickly delegate tasks to your
              turnover assistants, conveniently schedule guests and securely
              capture their payments at the click of a button, all while
              enjoying the support of our great team.
            </p>
          </Description>
        </DescContainer>
        <IconContainer>
          <Logo src={notxt_Lodgel} alt='Lodgel logo' />
        </IconContainer>
      </HeroContainer>
      <HeroContainer>
        <DescContainer>
          <Description>
            <DescHeader>Manage Your Properties</DescHeader>
            <p>
              A detailed view for each of your properties is at your fingertips.
              You have the freedom to add and remove properties as your
              portfolio changes over time, which keeps complete control of how
              your properties are managed in your hands.
            </p>
          </Description>
        </DescContainer>
        <IconContainer>
          {/* <Icon className='fas fa-igloo fa-4x' /> */}
          <Icon className='fas fa-building fa-4x' />
          {/* <Icon className='fas fa-warehouse fa-4x' /> */}
        </IconContainer>
      </HeroContainer>
      <HeroContainer>
        <DescContainer>
          <Description>
            <DescHeader>Keep Tabs On Your Guests</DescHeader>
            <p>
              Your guests are the heart of your business. To help you deliver
              the high-quality service that your guests deserve, we have created
              customizable checklists that ensure all of your guests' needs are
              met.
            </p>
          </Description>
        </DescContainer>
        <IconContainer>
          {/* <Icon className='fas fa-female fa-4x' /> */}
          <Icon className='fas fa-users fa-4x' />
          {/* <Icon className='fas fa-male fa-4x' /> */}
        </IconContainer>
      </HeroContainer>
      <HeroContainer>
        <DescContainer>
          <Description>
            <DescHeader>Coordinate Your Assistants</DescHeader>
            <p>
              Your time is valuable, and managing multiple properties can be
              stressful. Assistants can be invaluable in exceeding guest
              expectations, and can be your hands when you are needed elsewhere.
              Assign an assistant to take care of a property by default, and
              watch in real time as they complete their tasks.
            </p>
          </Description>
        </DescContainer>
        <IconContainer>
          {/* <Icon className='fas fa-running fa-4x' /> */}
          <Icon className='fas fa-people-carry fa-4x' />
          {/* <Icon className='fas fa-hands-helping fa-4x' /> */}
        </IconContainer>
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
