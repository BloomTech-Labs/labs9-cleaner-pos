import React, { FunctionComponent } from "react";
import { RouteProps, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button } from '../components/index';
import house from '../assets/house.jpg';

const Container = styled('div')`
  /* background-color: gray; */
  padding: 20px;
  `

const Nav = styled('nav')`
  margin: 0 auto;
  padding: 20px;
  max-width: 880px;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    font-size: 2.1rem;
    color: black;
  }
`

const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CenterImg = styled('img')`
  max-height: 500px;
  max-width: 800px;
  border-radius: 100px;
`

const AppHeader = styled('h1')`
  font-family: 'Staaliches', 'sans-serif';
`

const SideHeader = styled('h3')`
  font-family: 'Roboto';
`

const Footer = styled('div')`
  display: flex;
`

type Props = {};
// export const Button = () => {
//   return <div />;
// };

const Landing = (props: RouteComponentProps) => {
  return (
    <div>
      <Container>
        <AppHeader>Cleaner POS</AppHeader>
        <SideHeader>A POS that helps you keep things clean</SideHeader>
        <Nav>
          <a href='/'>Home</a>
          <a href='/'>About</a>
          <a href='/'>Contact</a>
          <Link to='/Login'>
            <Button text='Sign In'/>
          </Link>
        </Nav>
        <Wrapper>
          <SideHeader>Left</SideHeader>
            <CenterImg src={house} alt='Beautiful house with a pool' />
          <SideHeader>Right</SideHeader>
        </Wrapper>
        <Button text="Get started" onClick={() => { props.history.push('/Login') }}/>
        <Footer>
          <p>Test</p>
        </Footer>
      </Container>
    </div>
  );
};

export default Landing;
