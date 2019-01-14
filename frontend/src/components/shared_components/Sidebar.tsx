import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './index';
import styled from '@emotion/styled';
// import WebFont from 'webfontloader';

// WebFont.load({
//   google: {
//     families: ['Roboto: 300, 400, 700', 'sans-serif'],
//   },
// });

const Container = styled('div')`
  width: 40%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
`;

const NavWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  float: left;
`;

const SettingsWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  float: right;
`;

const StyledUL = styled('ul')`
  list-style-type: none;
  display: flex;
`;

const StyledLink = styled(NavLink)`
  float: left;
  padding: 10px;
  text-decoration: none;
  color: black;
`;


interface LinkProps {
  onClick?: () => MouseEvent;
}

const Sidebar = ({ onClick }: LinkProps) => {
  return (
    <Container>
      <NavWrapper>
        <StyledUL>
          <li>
            <StyledLink to='/reports'>
              <h3>Reports</h3>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/dashboard'>
              <h3>Properties</h3>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/assistants'>
              <h3>Assistants</h3>
            </StyledLink>
          </li>
        </StyledUL>
      </NavWrapper>
      <SettingsWrapper>
        <StyledUL>
          <li>
            <StyledLink to='/settings'>
              <h3>Settings</h3>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/logout'>
              {/* <Button onClick={} t='button' data-testid='signout'>Sign Out</Button> */}
              <Button text='Sign Out' />
            </StyledLink>
          </li>
        </StyledUL>
      </SettingsWrapper>
    </Container>
  );
};

export default Sidebar;
