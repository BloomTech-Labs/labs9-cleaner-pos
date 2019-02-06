import styled from '@emotion/styled';
import { Container, Button } from '../../components/index';

const pxToRem = (px: number) => px / 16;
const cardHeight = pxToRem(84);
const cardWidth = pxToRem(120);

export const BackButton = styled(Button)`
  width: ${pxToRem(156)}rem;
  height: ${pxToRem(48)}rem;
  font-size: ${pxToRem(20)}rem;
  /* border: 0.25px solid black; */
  border: var(--border);
  @media only screen and (max-width: 900px) {
  }
`;

export const PropertyButtons = styled('div')``;

export const WhiteButton = styled(Button)`
  color: var(--color-button-text-alt);
  background-color: var(--color-button-text-action);
  /* border: solid #707070 1px; */
  border: var(--border);
  width: ${pxToRem(161)}rem;
  height: ${pxToRem(36)}rem;
  font-size: ${pxToRem(16)}rem;
`;

export const PropertyContainer = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;

  h1 {
    margin: 0;
  }
`;

export const Top = styled(PropertyContainer)`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  /* Text */
  text-align: left;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 100%;
  }
  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const HouseInfo = styled('div')``;

export const ThumbNail = styled('img')`
  width: ${cardWidth}rem;
  height: ${cardHeight}rem;
  object-fit: cover;
  @media only screen and (max-width: 900px) {
    margin: 0 auto;
    padding: 10px;
  }
`;
export const MainText = styled.div`
  width: 100%;
  font-family: 'Roboto Bold', Arial, sans-serif;
  font-size: ${pxToRem(36)}rem;
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const SecondaryText = styled.div`
  margin-left: 1rem;
  padding: 1rem 0;
  font-family: 'Roboto Bold', Arial, sans-serif;
  font-size: ${pxToRem(20)}rem;
  @media only screen and (max-width: 900px) {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
  }
`;

export const Header = styled('div')`
  width: 100%;
  padding: 0.5rem ${pxToRem(28)}rem;
  /* height: ${pxToRem(40)}rem; */
  background: var(--color-text-accent);
  text-align: left;
  color: white;
  font-family: 'Roboto Medium', Arial, sans-serif;
  font-size: ${pxToRem(20)}rem;
`;

export const ListContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
export const ListDiv = styled('div')`
  width: 45%;
  min-width: ${pxToRem(254)}rem;
  /* border: solid #707070 1px; */
  border: var(--border);
  margin: ${pxToRem(36)}rem 0;
  display: flex;
  flex-direction: column;
`;

export const ItemDiv = styled('div')`
  /* padding: 0 ${pxToRem(23)}rem ${pxToRem(29)}rem ${pxToRem(23)}rem; */
  padding-bottom: ${pxToRem(29)}rem;
  /* margin: ${pxToRem(24)}rem ${pxToRem(28)}rem; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-bg-secondary);
  flex-grow: 1;
`;

export const TaskDiv = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .listMap {
    width: 100%;
  }

  .task {
    width: 100%;
    border-bottom: var(--border-bottom);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .task span {
    margin-right: 1rem;
    padding: 1rem 0;
  }
`;

// after List
export const AfterStay = styled('div')`
  width: 100%;
  @media only screen and (max-width: 900px) {
    width: 70%;
    margin: 0 auto;
  }
`;

export const AfterListDiv = styled(ListDiv)`
  display: flex;
  flex-flow: row wrap;
  align-items: top;
  width: 100%;
  margin: ${pxToRem(36)}rem 0;
  @media only screen and (max-width: 600px) {
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const AfterListDiv2 = styled(ListDiv)`
  margin: ${pxToRem(36)}rem ${pxToRem(28)}rem;
  width: ${pxToRem(255)}rem;
  @media only screen and (max-width: 400px) {
    border: none;
  }
`;

export const AfterHeader = styled(Header)`
  font-size: ${pxToRem(20)}rem;
  background: var(--color-bg-main);
  color: var(--color-button-text-alt);
  border-bottom: solid #707070 1px;
  justify-content: flex-start;
  @media only screen and (max-width: 400px) {
    max-width: 90%;
    align-self: centered;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }
`;

export const AfterItemDiv = styled(ItemDiv)`
  padding: ${pxToRem(24)}rem ${pxToRem(28)}rem;
  margin: 0;
  @media only screen and (max-width: 400px) {
    max-width: 90%;
    align-self: centered;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    /* border: solid #707070 1px; */
    border: var(--border);
  }
`;
