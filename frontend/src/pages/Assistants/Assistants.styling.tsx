import styled from '@emotion/styled';

const cardHeight = 216;

const AssistantItem = styled('div')`
    max-width: ${(1136 * 0.9) / 16}rem;
    height: ${cardHeight / 16}rem;
    width: 100%;
    border-radius: 0px;
    padding-left: 1px;
    margin-top: 1.5rem;
    display: flex;
    text-align: left;
    border: 0.5px solid black;
`;

const HeaderWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
`;

const ButtonContainer = styled('div')`
    height: 7.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ThumbNail = styled('img')`
    width: ${(cardHeight - 5) / 16}rem;
    height: ${(cardHeight - 5) / 16}rem;
`;

const CardHeading = styled('div')`
    /* margin-top: 12px; */
    height: 4.75rem;
    h4 {
        margin: 0;
        font-family: Roboto;
        font-weight: bold;
        font-size: 1.8rem;
    }
    p {
        font-weight: light;
        font-size: 1rem;
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
    height: 6.25rem;
    border: .5px solid #393534;
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
    `;

const Asst = styled('div')`
    padding: 0 15px;
    text-align: center;
    height: 6.25rem;
    border: .5px solid #393534;
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

const AssistantBar = styled('div')`
    display: flex;
    flex-direction: column;
`;

const AsstDetail = styled('div')`
    display: flex;
`;

const AsstProperty = styled('div')`
    display: flex;
    flex-direction: column;
`;

const DetailMap = styled('div')`
    display: flex;
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
    HeaderWrapper,
    AssistantBar,
    AsstDetail,
    AsstProperty,
    DetailMap,
};
