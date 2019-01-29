import styled from '@emotion/styled';
import { Container } from '../../components/';

const cardHeight = 216;

const AssistantItem = styled('div')`
  background: white;
  max-width: ${(1136 * 0.9) / 16}rem;
  height: ${cardHeight / 16}rem;
  margin-bottom: 2.25rem;
  display: flex;
  text-align: left;
  border: 0.5px solid var(--colour-border);
  color: var(--colour-main-black);
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: flex-start;
  }
`;

const HeaderWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.25rem;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    button {
      margin-top: 1.125rem;
    }
  }
`;

const ButtonContainer = styled('div')`
  margin: 0 0 0 0.75rem;
  height: 7.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ThumbNail = styled('img')`
  width: ${(cardHeight - 5) / 16}rem;
  height: ${(cardHeight - 5) / 16}rem;
  @media only screen and (max-width: 600px) {
    width: 100%;
    object-fit: cover;
    margin: 0 auto;
  }
`;

const CardHeading = styled('div')`
  width: 100%;
  @media only screen and (max-width: 600px) {
    text-align: center;
  }
`;

const CardBody = styled('div')`
  padding: 0 2.25rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  @media only screen and (max-width: 600px) {
    margin: 0;
    align-items: flex-start;
    flex-direction: column;
  }
`;

const CheckList = styled('div')`
  padding: 10px 15px 45px;
  text-align: center;
  height: 6.25rem;
  border: 0.5px solid #393534;
  font-size: 1.5rem;
  font-weight: light;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
    font-weight: bold;
  }
  @media only screen and (max-width: 600px) {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

const Asst = styled('div')`
  margin: 0 0 0 0.75rem;
  padding: 10px 15px 45px;
  text-align: center;
  height: 6.25rem;
  border: 0.5px solid #393534;
  font-size: 1.5rem;
  font-weight: light;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
    font-weight: bold;
  }
  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
`;

const AssistantHeader = styled('span')`
  font-size: 1.8rem;
  top: 0;
  left: 0;
  text-align: left;
  border-bottom: 1px solid #b8003f;
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
