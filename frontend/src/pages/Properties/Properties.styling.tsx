import styled from '@emotion/styled';

const cardHeight = 216;

const HouseItem = styled('div')`
  max-width: ${1136 * 0.9}px;
  height: ${cardHeight}px;
  width: 100%;
  border-radius: 0px;
  padding-left: 1px;
  margin-top: 24px;
  display: flex;
  text-align: left;
  border: 0.5px solid black;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
	flex: 1;
	justify-content: center;
	align-items: center;
 }
`;

const ButtonContainer = styled('div')`
  height: 124px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ThumbNail = styled('img')`
  width: ${cardHeight - 1}px;
  height: ${cardHeight - 1}px;
`;

const CardHeading = styled('div')`
  margin-top: 12px;
  height: 76px;
  h4 {
    margin: 0;
    font-family: Roboto;
    font-weight: bold;
    font-size: 30px;
  }
  p {
    font-weight: light;
    font-size: 16px;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  media only screen and (max-width: 600px) {
 	h4 {
		text-align: center;
	}
	p {
		text-align: center;
	}
`;
const CardContent = styled('div')`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  width: 100%;
  media only screen and (max-width: 600px) {
	justify-content: center;
	align-items: center;
`;

const CardBody = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media only screen and (max-width: 600px) {
	flex-direction: column;
	flex: 1;
`;

const CheckList = styled('div')`
  padding: 0 15px;
  text-align: center;
  height: 100px;
  -moz-box-shadow: 0 0 3px #000;
  -webkit-box-shadow: 0 0 3px #000;
  box-shadow: 0 0 3px #000;
  font-size: 24px;
  font-weight: light;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
    font-weight: bold;
  }
`;

const Cleaner = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HouseHeader = styled('span')`
  font-size: 36px;
  top: 0;
  left: 0;
  text-align: left;
  margin-bottom: 10px;
  border-bottom: 1px solid #b8003f;
  max-width: 290px;
  media only screen and (max-width: 600px) {
  	justify-content: center;
	align-items: center;
  }
`;

export {
  HouseHeader,
  HouseItem,
  CardBody,
  ThumbNail,
  CardContent,
  ButtonContainer,
  CardHeading,
  Cleaner,
  CheckList,
};
