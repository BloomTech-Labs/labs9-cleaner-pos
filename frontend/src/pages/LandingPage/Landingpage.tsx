import React, { useContext, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { UserContext } from '../../App';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container } from '../../components/index';
import house from '../../assets/house_alt.jpg';
import lodgel from '../../assets/lodgel.jpg';
import notxt_Lodgel from '../../assets/notxt_Lodgel.jpg';
import Fade from '@material-ui/core/Fade';
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
  LandingContainer,
  Screen,
} from './LandingPage.styling';

const Landing = (props: RouteComponentProps) => {
  const { loggedIn } = useContext(UserContext);
  const [currPage, setCurrPage] = useState(0);

  const isPage = (page: number) => page === currPage;

  return (
    <LandingContainer>
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
      <Fade in={isPage(0)} mountOnEnter unmountOnExit>
        <ScreenA setCurrPage={setCurrPage} {...props} />
      </Fade>
      <Fade in={isPage(1)} mountOnEnter unmountOnExit>
        <ScreenB setCurrPage={setCurrPage} {...props} />
      </Fade>
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
    </LandingContainer>
  );
};

const ScreenA = (
  props: RouteComponentProps & {
    setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  },
) => (
  <Screen>
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
      <Button
        text='Learn More'
        color='var(--color-accent)'
        onClick={() => props.setCurrPage((prev) => prev + 1)}
      />
      <h2>Simplify Managing Your Rental Properties.</h2>
    </CTA>
  </Screen>
);

const ScreenB = (
  props: RouteComponentProps & {
    setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  },
) => (
  <Screen>
    <HeroContainer>
      <DescContainer>
        <Description>
          <DescHeader>Welcome To Lodgel</DescHeader>
          <p>
            Lodgel is designed to take the hassle out of out of your property
            management experience. You can quickly delegate tasks to your
            turnover assistants, conveniently schedule guests and securely
            capture their payments at the click of a button, all while enjoying
            the support of our great team.
          </p>
        </Description>
      </DescContainer>
      <IconContainer>
        <Logo src={notxt_Lodgel} alt='Lodgel logo' />
      </IconContainer>
    </HeroContainer>
    <Button
      text='Go Back'
      color='var(--color-accent)'
      onClick={() => props.setCurrPage((prev) => prev - 1)}
    />
  </Screen>
);

export default Landing;
