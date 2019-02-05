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

const HeroContainer = styled('div')`
  display: flex;
  justify-content: space-evenly;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid black;
  width: 100%;
  background-color: white;
`;

const Description = styled('div')`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0 1rem;
`;

const Screenshot = styled('img')`
  max-height: 400px;
  max-width: 400px;
`;

const DescHeader = styled('div')`
  color: #4593B6;
  font-size: 1.5rem;
`;

export {
  Footer,
  CenterImg,
  ButtonWrapper,
  Wrapper,
  Nav,
  CTA,
  BigLogo,
  Logo,
  HeroContainer,
  Description,
  Screenshot,
  DescHeader,
};
