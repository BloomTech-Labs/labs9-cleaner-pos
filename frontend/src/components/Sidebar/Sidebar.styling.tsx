import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';
// Types
import { RouteComponentProps } from 'react-router-dom';

const bp = '780px';

const conditionallyHideSidebar = (property: string) => (
  props: RouteComponentProps,
): string => {
  /* Conditionally hides the sidebar when on certain paths in front end.
     Accepts a string argument being the display property you want it to have
     when visible.
     Paths are defined below:
  */
  const pathsToHideSidebar = ['/', '/Login'];

  return pathsToHideSidebar.includes(props.location.pathname)
    ? 'none'
    : property;
};

const Container = styled('div')`
  /* Conditional Display */
  display: ${conditionallyHideSidebar('block')};

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
    width: 100%;
    display: ${conditionallyHideSidebar('flex')};
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 1.5rem 0;
    color: var(--color-main-dark);
    border-bottom: var(--border);
  }

  @media only screen and (min-width: ${bp}) {
    /* Conditional Display */
    display: ${conditionallyHideSidebar('block')};

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
    /* padding-bottom: 0.75rem; */
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
  margin-right: auto;
  :last-of-type {
    margin-right: 0;
  }
  .header-bar--subscribe-button {
    background: var(--color-accent-alt);
  }
  .signout {
    border: none;
    background-color: #fff;
    width: 40px;
    padding-right: 1rem;
    margin-right: 0;
    font-size: 1.35rem;
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
  :active {
    border: none;
  }
  padding: 0 1rem 0 1rem;
  @media only screen and (min-width: ${bp}) {
    :first-of-type {
      padding-left: 0;
    }
    padding: 0 2rem;
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
  @media only screen and (min-width: 700) {
    padding: 0 2rem;
  }
`;

const Logo = styled('img')`
  height: 40px;
  width: 40px;
  margin-left: 2rem;
`;

export {
  Container,
  NavBar,
  NavWrapper,
  SettingsWrapper,
  StyledUL,
  StyledLink,
  Logo,
};
