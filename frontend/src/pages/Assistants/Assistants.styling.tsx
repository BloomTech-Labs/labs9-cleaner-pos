import styled from '@emotion/styled';

const cardHeight = 216;

const AssistantItem = styled('div')`
    height: ${cardHeight}px;
`;

const ButtonContainer = styled('div')`
    height: 124px;
`;

const ThumbNail = styled('img')`
    width: ${cardHeight - 1}px;
    height: ${cardHeight - 1}px;
`;

const CardHeading = styled('div')`
    margin-top: 12px;
`;

const CardContent = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const CardBody = styled('div')`
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const CheckList = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Asst = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const AssistantHeader = styled('span')`
    text-align: left;
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
