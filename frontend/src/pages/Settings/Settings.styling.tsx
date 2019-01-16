import styled from '@emotion/styled';

const Header = styled('span')`
    width: 100%;
    background: #4593B6;
    text-align: left;
    h2 {
        padding-left: 32px;
        color: white;
    }
`;

const Card = styled('div')`
    width: 100%;
    background: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    h3 {
        font-family: 'Roboto';
        font-weight: condensed;
    }
`;

const Positioner = styled('div')`
    width: 50%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: space-evenly;
    justify-content: space-around;
    /* border: 1px solid red; */
`;

const ButtonText = styled('div')`
    display: flex;
    flex-direction: row;
    padding-bottom: 20px;
    /* border: 1px solid orange; */
`;

export {
    Card,
    Positioner,
    Header,
    ButtonText,
};

