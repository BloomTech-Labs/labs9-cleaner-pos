import styled from '@emotion/styled';

const cardHeight = 216;

const AssistantItem = styled('div')`
    max-width: ${1136 * 0.9}px;
    height: ${cardHeight}px;
    width: 100%;
    border-radius: 0px;
    padding-left: 1px;
    margin-top: 24px;
    display: flex;
    text-align: left;
    border: 0.5px solid black;height: ${cardHeight}px;
`;

const ButtonContainer = styled('div')`
    height: 124px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ThumbNail = styled('img')`
    width: ${cardHeight - 5}px;
    height: ${cardHeight - 5}px;
`;

const CardHeading = styled('div')`
    /* margin-top: 12px; */
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
`;

const CardContent = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 15px;
`;

const CardBody = styled('div')`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const CheckList = styled('div')`
    padding: 0 15px;
    text-align: center;
    height: 100px;
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

const Asst = styled('div')`
    padding: 0 15px;
    text-align: center;
    height: 100px;
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

const AssistantHeader = styled('span')`
    font-size: 30px;
    top: 0;
    left: 0;
    text-align: left;
    border-bottom: 1px solid #b8003f;
    align-items: flex-start;
    max-width: 290px;
`;

export {
    AssistantItem,
    ButtonContainer,
    ThumbNail,
    CardHeading,
    CardContent,
    CardBody,
    CheckList,
    Asst,
    AssistantHeader,
};
