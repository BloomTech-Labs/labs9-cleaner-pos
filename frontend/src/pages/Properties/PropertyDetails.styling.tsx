import styled from '@emotion/styled';
import { Container, Button } from '../../components/index';

const pxToRem = (px: number) => px / 16;
const cardHeight = pxToRem(84);
const cardWeidth = pxToRem(120);

export const BackButton = styled(Button)`
  margin-left: auto;
  width: ${pxToRem(156)}rem;
  height: ${pxToRem(48)}rem;
  font-size: ${pxToRem(20)};
`;

export const WhiteButton = styled(Button)`
  color: var(--colour-button-text-alt);
  background-color: var(--colour-button-background-alt);
  border: solid #707070 1px;
  width: ${pxToRem(161)}rem;
  height: ${pxToRem(36)}rem;
  font-size: ${pxToRem(16)}rem;
`;

export const PropertyContainer = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 1080px;
`;

export const Top = styled(PropertyContainer)`
  margin: 0 ${pxToRem(22)}rem;
  width: 50%;
  display: flex;
  align-items: flex-start;
  /* Text */
  text-align: left;
`;
export const ThumbNail = styled('img')`
  width: ${cardWeidth}rem;
  height: ${cardHeight}rem;
  object-fit: cover;
`;
export const MainText = styled.div`
  width: 75%;
  font-family: 'Roboto Bold', Arial, sans-serif;
  font-size: ${pxToRem(36)}rem;
`;

export const SecondaryText = styled.div`
  display: inline-block;
  text-align: left;
  font-family: 'Roboto Bold', Arial, sans-serif;
  font-size: ${pxToRem(24)}rem;
`;

export const Header = styled('div')`
  width: 100%;
  padding: ${pxToRem(16)}rem ${pxToRem(28)}rem;
  height: ${pxToRem(60)}rem;
  background: var(--colour-accent);
  text-align: left;
  color: white;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: ${pxToRem(24)}rem;
`;

export const ListContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const ListDiv = styled('div')`
  width: 47.5%;
  border: solid #707070 1px;
  margin: ${pxToRem(36)}rem 0;
`;

export const ItemDiv = styled('div')`
  padding: ${pxToRem(29)}rem ${pxToRem(23)}rem;
  margin: ${pxToRem(24)}rem ${pxToRem(28)}rem;
  display: flex;
  flex-direction: column;
  background-color: var(--colour-button-background-alt);
`;

export const TaskDiv = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
    margin: ${pxToRem(8)}rem 0;
    font-size: ${pxToRem(20)}rem;
    font-family: 'Roboto Light', Arial, sans-serif;
  }
`;

// after List

export const AfterListDiv = styled(ListDiv)`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  width: 100%;
  margin: ${pxToRem(36)}rem 0;
`;

export const AfterListDiv2 = styled(ListDiv)`
  margin: ${pxToRem(36)}rem ${pxToRem(28)}rem;
  border: none;
  width: 25%;
`;

export const AfterHeader = styled(Header)`
  font-size: ${pxToRem(20)}rem;
  background: var(--colour-main-background);
  color: var(--colour-button-text-alt);
  border: solid #707070 1px;
`;

export const AfterItemDiv = styled(ItemDiv)`
  padding: ${pxToRem(24)}rem ${pxToRem(28)}rem;
  margin: 0;
`;
