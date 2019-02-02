import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
// Types
import { RouteComponentProps } from 'react-router-dom';

const bp = '700px';

const hideSidebar = (props: RouteComponentProps) => {
  /* Conditionally hides the sidebar when on certain paths in front end.
     Paths are defined below:
  */
  const pathsToHideSidebar = ['/', '/Login'];

  console.log('props.location.pathname', props.location.pathname);
  return pathsToHideSidebar.includes(props.location.pathname)
    ? 'none'
    : 'block';
};

const Container = styled('div')`
  /* Conditional Display */
  display: ${hideSidebar};

  /* Box Model & Sizing */
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;

  /* Flex */
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .button-sign-out {
    margin-bottom: 0;
    margin-right: 1rem;
  }

  .menu {
    height: 100%;
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 2rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid black;
  }

  @media only screen and (min-width: ${bp}) {
    /* Conditional Display */
    display: ${hideSidebar};

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
    padding-bottom: 0.75rem;
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
  align-items: center;
  margin-right: 1rem;
  .signout {
    border: none;
    background-color: #eeeff5;
  }
  @media only screen and (min-width: ${bp}) {
    display: flex;
    padding-left: 1rem;
    align-items: center;
  }
`;

const StyledUL = styled('div')`
  list-style-type: none;
  display: flex;
  align-items: center;
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  padding: 0 4rem;
  @media only screen and (min-width: ${bp}) {
    padding: 0 1.75rem;
    float: left;
    text-decoration: none;
    color: var(--color-text-dark);
    &:active {
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
