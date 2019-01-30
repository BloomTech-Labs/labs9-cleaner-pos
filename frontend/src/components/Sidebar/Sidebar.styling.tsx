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
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;

  /* Flex */
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .button-sign-out {
    margin-bottom: 1.5rem;
  }

  .menu {
    height: 100%;
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 2rem 0;
    border-bottom: 1px solid black;
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

const NavBar = styled('nav')`
  display: none;
  @media only screen and (min-width: ${bp}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid black;
    margin-bottom: 1.5rem;
  }
`;

const NavWrapper = styled('div')`
  display: none;
  @media only screen and (min-width: ${bp}) {
    display: flex;
    padding-right: 1rem;
  }
`;

const SettingsWrapper = styled('div')`
  display: flex;
  @media only screen and (min-width: ${bp}) {
    display: flex;
    padding-left: 1rem;
    align-items: baseline;
  }
`;

const StyledUL = styled('div')`
  list-style-type: none;

  display: flex;
  align-items: baseline;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  padding: 0 4rem;


  @media only screen and (min-width: ${bp}) {
  float: left;
  /* padding-right: 2.5rem; */
  text-decoration: none;
  color: black;
  &:active{
    text-decoration: underline;
  }
  h4 {
    font-family: 'Roboto';
    font-weight: condensed;
    font-size: 24px;
  }
  }
`;

export { Container, NavBar, NavWrapper, SettingsWrapper, StyledUL, StyledLink };
