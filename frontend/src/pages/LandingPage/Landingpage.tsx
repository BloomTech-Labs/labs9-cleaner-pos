import React, { useContext, useState } from 'react';
import { useTransition, animated } from 'react-spring';
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
  const [currPage, setCurrPage] = useState(0);

  const transitions = useTransition(currPage, currPage, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  const renderScreenBasedOnCurrPage = (page: number) => {
    console.log(page);
    const screens = [screenA, screenB];
    return screens[page](setCurrPage);
  };

  return (
    <>
      {transitions.map(({ item, transitionProps, key }: any) => (
        <animated.div key={key} style={transitionProps}>
          {renderScreenBasedOnCurrPage(currPage)}
        </animated.div>
      ))}
    </>
  );
};

const screenA = (setCurrPage: React.Dispatch<React.SetStateAction<number>>) => (
  <div className='a'>
    A
    <button
      onClick={(e) => {
        e.preventDefault();
        setCurrPage(1);
      }}
    >
      Next
    </button>
  </div>
);

const screenB = (setCurrPage: React.Dispatch<React.SetStateAction<number>>) => (
  <div className='b'>
    B{' '}
    <button
      onClick={(e) => {
        e.preventDefault();
        setCurrPage(0);
      }}
    >
      Previous
    </button>
    {/* <button onClick={() => setCurrPage((prev) => prev + 1)}>Next</button> */}
  </div>
);

export default Landing;
