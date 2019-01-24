import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const Container = styled('div')`
  /* Box Model & Sizing */
  margin: auto;
  width: 100%;
  max-width: 1000px;
  border-bottom: 1px solid gray;

  /* Flex */
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .button-sign-out {
    margin-bottom: 1.5rem;
  }
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
  justify-content: space-between;
  align-items: baseline;
`;

const StyledLink = styled(NavLink)`
  float: left;
  padding: 0 20px;
  text-decoration: none;
  color: black;
  h4 {
    font-family: 'Roboto';
    font-weight: condensed;
    font-size: 24px;
  }
`;

export { Container, NavWrapper, SettingsWrapper, StyledUL, StyledLink };
