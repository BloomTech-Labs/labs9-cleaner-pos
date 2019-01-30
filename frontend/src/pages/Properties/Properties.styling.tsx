import styled from '@emotion/styled';

const cardHeight = 216;

const PropContainer = styled('div')`
	display: flex;
  flex-direction: column;
	justify-content: center;
	align-items: center;
`;

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
  background-color: white;
  @media only screen and (max-width: 900px) {
    flex-direction: column;
		flex: 1;
    width: 70%;
		justify-content: center;
		align-items: center;
		padding: 10px 0 10px 0;
 	}
`;

const ButtonContainer = styled('div')`
  height: 124px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media only screen and (max-width: 900px) {
		padding: 10px 0 10px 0;
  }
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
  @media only screen and (max-width: 900px) {
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
  @media only screen and (max-width: 600px) {
	justify-content: center;
	align-items: center;
`;

const CardBody = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media only screen and (max-width: 900px) {
		flex-direction: column;
		flex: 1;
  }
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
  @media only screen and (max-width: 900px) {
	  padding: 20px 0 20px 0;
  }
`;

const HouseHeader = styled('span')`
  font-size: 36px;
  margin: 20px;  
  text-align: left;
  border-bottom: 1px solid #b8003f;
  max-width: 290px;
  @media only screen and (max-width: 900px) {
	  text-align: center;
  }
`;

export {
	PropContainer,
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
