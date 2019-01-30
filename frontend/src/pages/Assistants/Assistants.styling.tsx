import styled from '@emotion/styled';
import { Container } from '../../components/';

const pxToRem = (px: number): string => `${px / 16}rem`;
const pxToVw = (px: number): string => `${(px / 1080) * 100}vw`;
// Some size constants
const boxHeight = '5rem';
const boxWidth: string = `30%`;
const bp = `650px`;

const AssistantItem = styled('div')`
  /* Color */
  background: white;
  color: var(--colour-main-black);

  /* Sizing */
  height: ${pxToRem(188)};
  border: 0.5px solid var(--colour-border);

  /* Flex */
  display: flex;

  /* Text */
  text-align: left;

  .check-boxes {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  @media screen and (max-width: ${bp}) {
    width: 100%;
    height: 100%;
    /* Flex */
    flex-direction: column;
    align-items: flex-start;

    .check-boxes {
      flex-flow: row wrap;
      margin-bottom: 1rem;
    }
  }
`;

const HeaderWrapper = styled('div')`
  /* Flex */
  display: flex;
  justify-content: space-between;

  /* Sizing */
  margin-bottom: 2.25rem;

  @media only screen and (max-width: ${bp}) {
    flex-direction: column;
    align-items: center;
    button {
      margin-top: 1.125rem;
    }
  }
`;

const ButtonContainer = styled('div')`
  /* Sizing */
  margin: 0 0 0 0.75rem;
  width: ${boxWidth};
  height: ${pxToRem(42)};
  /* Flex */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* Text */
  font-size: ${pxToRem(20)};

  @media screen and (max-width: 550px) {
    margin: auto;
    margin: 1rem 0;
    flex-basis: 100%;
    width: 100%;

    button {
      width: 100%;
      max-width: 550px;
    }
  }
`;

const ThumbNail = styled('img')`
  width: ${pxToVw(254 * 0.9)};
  height: auto;
  object-fit: cover;

  @media only screen and (max-width: ${bp}) {
    margin: 1rem auto 0 auto;
    width: 4.5rem;
    border-radius: 100%;
    object-fit: cover;
  }
`;

const CardHeading = styled('div')`
  width: 100%;
  line-height: 0.5;
  margin-bottom: 1rem;
  @media only screen and (max-width: ${bp}) {
    text-align: center;
  }
`;

const CardBody = styled('div')`
  padding: 0 2.25rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  @media only screen and (max-width: ${bp}) {
    margin: 0;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const CheckList = styled('div')`
  /* Sizing */
  height: ${boxHeight};
  width: ${boxWidth};
  border: 0.5px solid var(--colour-border);
  /* Text */
  text-align: center;
  font-size: 1.5rem;
  font-weight: light;
  /* Flex */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  p {
    margin: 0;
    font-weight: bold;
  }
  .secondary {
    color: var(--colour-accent);
  }
  @media screen and (max-width: 550px) {
    width: 45%;
  }
`;

const Asst = styled('div')`
  /* Sizing */
  width: ${boxWidth};
  height: ${boxHeight};
  border: var(--border);
  /* Text */
  text-align: center;
  font-size: 1.5rem;
  font-weight: light;
  /* Flex */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .secondary {
    color: var(--colour-accent);
  }
  p {
    margin: 0;
    font-weight: bold;
  }
  @media screen and (max-width: 550px) {
    width: 45%;
  }
`;

const AssistantHeader = styled('span')`
  font-size: 1.8rem;
  top: 0;
  left: 0;
  text-align: left;
  align-items: flex-start;
  max-width: 18.125rem;
`;

const AssistantDetailContainer = styled(Container)`
  flex-direction: row;
`;

const AssistantBar = styled('div')`
  height: 54rem;
  width: 21rem;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--colour-border);
`;

const AsstDetail = styled('div')`
  height: 6rem;
  color: white;
  background: var(--colour-accent);
  display: flex;
  flex-direction: row;
  border: 1px solid var(--colour-border);
`;

const AsstProperty = styled('div')`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: 1px solid var(--colour-border);
`;

const PropertyContainer = styled('div')`
  border: 0.5px solid var(--colour-border);
  background: white;
  height: 300px;
  width: 18rem;
`;

const PropertyHeading = styled('div')`
  color: var(--colour-accent);
  background: #eeeff5;
  height: 3.75rem;
  border-bottom: 1px solid var(--colour-border);
  padding: 0.3rem 0;
`;

export {
  AssistantItem,
  AssistantDetailContainer,
  ButtonContainer,
  ThumbNail,
  CardHeading,
  CardBody,
  CheckList,
  Asst,
  AssistantHeader,
  HeaderWrapper,
  AssistantBar,
  AsstDetail,
  AsstProperty,
  PropertyContainer,
  PropertyHeading,
};
