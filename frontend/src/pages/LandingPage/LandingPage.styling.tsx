import styled from '@emotion/styled';

const Nav = styled('nav')`
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  a {
    text-decoration: none;
    font-size: 2.1rem;
    color: black;
  }
`;

const Wrapper = styled('div')`
  margin: 0 auto;
  max-width: 70%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonWrapper = styled('div')`
  /* border: 1px solid green; */
  padding-top: 24px;
  margin: 0 auto;
  max-width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: 'Roboto';
  h2 {
    padding-top: 24px;
  }
`;

const CenterImg = styled('img')`
  max-height: 500px;
  max-width: 800px;
  /* border-radius: 100px; */

  /* Clip */
  -webkit-clip-path: polygon(50% 100%, 0 0, 100% 0);
  clip-path: polygon(50% 100%, 0 0, 100% 0);
`;

const AppHeader = styled('h1')`
  font-family: 'Staatliches', 'sans-serif';
`;

const SideHeader = styled('div')`
  font-family: 'Roboto';
  margin: 0 auto;
  padding: 15px;
  max-width: 20%;
`;

const Footer = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: gray;
  padding: 10px 50px 0 50px;
  position: fixed;
  margin: auto;
  left: 0px;
  bottom: 0px;
  height: 10%;
  width: 100%;
  a {
    font-family: 'Roboto';
    font-size: 1.4rem;
    text-decoration: none;
    color: #3c3c3c;
  }
`;

export {
  Footer,
  SideHeader,
  AppHeader,
  CenterImg,
  ButtonWrapper,
  Wrapper,
  Nav,
};
