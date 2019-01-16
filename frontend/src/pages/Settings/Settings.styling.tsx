import styled from '@emotion/styled';

const Header = styled('span')`
    width: 100%;
    background: teal;
    text-align: left;
    padding-left: 15px;
`;

const Card = styled('div')`
    width: 100%;
    background: white;
    display: flex;
`;

const Positioner = styled('div')`
    width: 50%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    border: 1px solid red;
`;

const ButtonText = styled('div')`
    display: flex;
    flex-direction: row;
    border: 1px solid green;
`;

export {
    Card,
    Positioner,
    Header,
    ButtonText,
};

