import React from 'react';
import { Button } from '../index';
import {
  Container,
  NavWrapper,
  SettingsWrapper,
  StyledUL,
  StyledLink,
} from './Sidebar.styling';

interface LinkProps {
  onClick?: () => MouseEvent;
}

const Sidebar = ({ onClick }: LinkProps) => {
  return (
    <Container>
      <NavWrapper>
        <StyledUL>
          <li>
            <StyledLink to='/properties'>
              <h4>Properties</h4>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/guests'>
              <h4>Guests</h4>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/assistants'>
              <h4>Assistants</h4>
            </StyledLink>
          </li>
        </StyledUL>
      </NavWrapper>
      <SettingsWrapper>
        <StyledUL>
          <li>
            <StyledLink to='/settings'>
              <h4>Settings</h4>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/logout'>
              {/* <Button onClick={} t='button' data-testid='signout'>Sign Out</Button> */}
              <Button className='button-sign-out' text='Sign Out' />
            </StyledLink>
          </li>
        </StyledUL>
      </SettingsWrapper>
    </Container>
  );
};

export default Sidebar;
