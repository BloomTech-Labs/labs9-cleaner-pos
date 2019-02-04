import styled from '@emotion/styled';

const Nav = styled('nav')`
  margin: 0 auto;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  /* Thank you, https://css-tricks.com/clipping-masking-css/ */
  -webkit-clip-path: polygon(50% 100%, 0 0, 100% 0);
  clip-path: polygon(50% 100%, 0 0, 100% 0);
`;

const AppHeader = styled('h1')`
  font-family: 'Staatliches', 'sans-serif';
`;

const CTA = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 1.5rem auto;
`;

const Footer = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 2px solid #393534;
  padding: .5rem 0;
  /* position: fixed; */
  margin: 0 auto;
  /* left: 0px;
  bottom: 0px; */
  height: 20%;
  width: 100%;
  a {
    font-family: 'Roboto';
    font-size: 1.4rem;
    text-decoration: none;
    color: #3c3c3c;
  }
`;

const BigLogo = styled('img')`
  height: 125px;
  width: 125px;
`;

const Logo = styled('img')`
  height: 100px;
  width: 100px;
`;

export {
  Footer,
  AppHeader,
  CenterImg,
  ButtonWrapper,
  Wrapper,
  Nav,
  CTA,
  BigLogo,
  Logo,
};
