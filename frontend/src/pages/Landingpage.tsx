import React, { FunctionComponent } from "react";
import { RouteProps } from 'react-router';
import styled from '@emotion/styled';

import Button from '../components/shared_components/Button';

const Container = styled('div')`
  background-color: burlywood;
  `
const Nav = styled('nav')`
  margin: 0 auto;
  max-width: 880px;
  display: flex;
  justify-content: space-between;
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
      </Container>
    </div>
  );
};

export default Landing;