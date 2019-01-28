import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
// Types
import { RouteComponentProps } from 'react-router-dom';
const bp = '700px';

const Container = styled('div')`
  /* Conditional Display */
  display: ${(props: RouteComponentProps) =>
    props.location.pathname === '/' ? 'none' : 'block'};

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

  .menu {
    height: 100%;
    display: flex;
    align-items: center;
  }

  @media only screen and (min-width: ${bp}) {
    /* Conditional Display */
    display: ${(props: RouteComponentProps) =>
      props.location.pathname === '/' ? 'none' : 'block'};

    .menu {
      display: none;
    }
  }
`;

const NavWrapper = styled('div')`
  display: none;

  @media only screen and (min-width: ${bp}) {
    display: flex;
    justify-content: space-between;
    float: left;
  }
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
