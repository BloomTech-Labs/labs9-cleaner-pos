import styled from '@emotion/styled';
import { Container, Button } from '../../components/index';
import { TextField } from '@material-ui/core';
import { ComponentClass } from 'react';

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

export const PropertyButtons = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  button {
    width: 200px;
    height: ${pxToRem(36)}rem;
    margin: 0.5rem 0;
    font-size: 1rem;
  }
`;

export const WhiteButton = styled(Button)`
  margin: 1rem auto;
  /* color: var(--color-button-text-alt);
  background-color: var(--color-button-text-action); */
  width: ${pxToRem(161)}rem;
  height: ${pxToRem(36)}rem;
  font-size: ${pxToRem(16)}rem;
`;

export const IconButton = styled(Button)`
  background-color: inherit;
  width: auto;
  height: auto;
  margin: 0.5rem;
  .fa-check {
    color: var(--color-text-accent);
  }
  .fa-times {
    color: var(--color-border-strong);
  }
`;

export const StyledTextField = styled(TextField as ComponentClass<any>)`
  margin-left: 1rem;
  font-size: 1.125rem;
  padding: 0.6875rem 0;
`;

export const PropertyContainer = styled(Container)`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  h1 {
    margin: 0;
    padding-left: 0.5rem;
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
  span {
    border: none;
  }
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

export const HouseInfo = styled('div')`
  #address {
    margin-left: 0;
    padding: 0.5rem 0;
    padding-left: 0.5rem;
    font-family: 'Roboto Bold', Arial, sans-serif;
    font-size: 1.125rem;
    text-align: left;
  }
`;

export const ThumbNail = styled('img')`
  width: ${cardWidth * 2}rem;
  height: ${cardHeight * 2}rem;
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
  padding-left: 0.5rem;
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const SecondaryText = styled.div`
  padding: 0.5rem 0;
  margin-left: 1rem;
  font-family: 'Roboto Bold', Arial, sans-serif;
  font-size: 1.125rem;
  text-align: left;
  @media only screen and (max-width: 900px) {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
  }
`;

export const Header = styled('div')`
  width: 100%;
  padding: 0.5rem 1rem;
  /* height: ${pxToRem(40)}rem; */
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  background: var(--color-text-accent);
  text-align: left;
  color: white;
  font-family: 'Roboto Medium', Arial, sans-serif;
  font-size: ${pxToRem(20)}rem;
  /* Flex */
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.4);
  border-radius: var(--border-radius);
  margin: ${pxToRem(36)}rem 0;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 900px) {
    width: 100%;
  }
`;

export const ItemDiv = styled('div')`
  /* padding: 0 ${pxToRem(23)}rem ${pxToRem(29)}rem ${pxToRem(23)}rem; */
  padding-bottom: ${pxToRem(29)}rem;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  /* margin: ${pxToRem(24)}rem ${pxToRem(28)}rem; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--color-bg-secondary);
  flex-grow: 1;
  @media only screen and (max-width: 900px) {
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .listMap {
    width: 100%;
  }
  .task {
    width: 100%;
    border-bottom: var(--border-bottom);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .task span {
    margin-right: 1rem;
    padding: 1rem 0;
  }
  .trash {
    margin-left: 1rem;
    cursor: pointer;
    color: var(--color-error);
  }
`;

export const TaskDiv = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  justify-content: space-around;
  align-items: top;
  width: 100%;
  margin: ${pxToRem(36)}rem 0;
  background-color: var(--color-main-light);
  @media only screen and (max-width: 600px) {
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .header-after {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-after span {
    margin: 0;
  }
  .header-after button {
    margin: 0;
    background-color: var(--color-button-text);
    color: var(--color-button-background);
  }
`;

export const DialogStay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  .delete button {
    border-radius: var(--border-radius);
    background-color: var(--color-error);
  }
`;

export const DialogButton = styled(Button)`
  margin: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1rem;
`;

export const AfterListDiv2 = styled(ListDiv)`
  margin: 2rem 0;
  width: 45%;
  @media only screen and (max-width: 900px) {
    margin: 2rem 1rem;
  }
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
  /* padding: ${pxToRem(24)}rem ${pxToRem(28)}rem; */
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
