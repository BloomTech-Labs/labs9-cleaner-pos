import React, { FunctionComponent } from "react";
import { RouteProps } from 'react-router';
import styled from '@emotion/styled';

import Button from '../components/shared_components/Button';
import house from '../assets/house.jpg';

const Container = styled('div')`
  background-color: gray;
  padding: 20px;
  `

const Nav = styled('nav')`
  margin: 0 auto;
  padding: 20px;
  max-width: 880px;
  display: flex;
  justify-content: space-between;
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

type Props = {};
// export const Button = () => {
//   return <div />;
// };

const Landing = (props: RouteProps) => {
  return (
    <div>
      <Container>
        <h1>Cleaner POS</h1>
        <h4>A POS that helps you keep things clean</h4>
        <Nav>
          <a href='/'>Home</a>
          <a href='/'>About</a>
          <a href='/'>Contact</a>
          <Button text='Sign In'/>
        </Nav>
        <Wrapper>
          <h3>Left</h3>
            <CenterImg src={house} alt='Beautiful house with a pool' />
          <h3>Right</h3>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Landing;