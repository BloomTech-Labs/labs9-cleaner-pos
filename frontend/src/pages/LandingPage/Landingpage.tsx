import React, { useContext, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { UserContext } from '../../App';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Container } from '../../components/index';
import house from '../../assets/house_alt.jpg';
import lodgel from '../../assets/lodgel.jpg';
import notxt_Lodgel from '../../assets/notxt_Lodgel.jpg';
import Slide from '@material-ui/core/Slide';
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
  Screen,
} from './LandingPage.styling';

const Landing = (props: RouteComponentProps) => {
  const { loggedIn } = useContext(UserContext);
  const [currPage, setCurrPage] = useState(0);

  const isPage = (page: number) => page === currPage;

  return (
    <Container>
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
      <Slide direction='right' in={isPage(0)} mountOnEnter unmountOnExit>
        <ScreenA setCurrPage={setCurrPage} {...props} />
      </Slide>
      <Slide direction='right' in={isPage(1)} mountOnEnter unmountOnExit>
        <ScreenB setCurrPage={setCurrPage} {...props} />
      </Slide>
    </Container>
  );
};

const ScreenA = (
  props: RouteComponentProps & {
    setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  },
) => (
  <>
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
        onClick={() => props.setCurrPage((prev: number) => prev + 1)}
      />
      <h2>Simplify Managing Your Rental Properties.</h2>
    </CTA>
  </>
);

const ScreenB = (
  props: RouteComponentProps & {
    setCurrPage: React.Dispatch<React.SetStateAction<number>>;
  },
) => (
  <div className='b'>
    B{' '}
    <button
      onClick={(e) => {
        e.preventDefault();
        props.setCurrPage(0);
      }}
    >
      Previous
    </button>
    {/* <button onClick={() => setCurrPage((prev) => prev + 1)}>Next</button> */}
  </div>
);

export default Landing;
