import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

const Container = styled('div')`
    /* width: 90%; */
    margin: 0 15% 10px 15%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
`;

const NavWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    float: left;
`;

const SettingsWrapper = styled('div')`
    display: flex;
    justify-content: space-between;
    float: right;
`;

const StyledUL = styled('ul')`
    list-style-type: none;
    display: flex;
`;

const StyledLink = styled(NavLink)`
    float: left;
    padding: 0 20px;
    text-decoration: none;
    color: black;
    h4 {
        font-family: 'Roboto';
        font-weight: condensed;
        font-size: 24px;
    }
`;

const Accordion = styled('button')`
	background-color: Transparent;
	background-repeat: no-repeat;
	border: none;
	cursor: pointer;
	outline: none;
	display: none;
	overflow: hidden;
`;

export {
    Container,
    NavWrapper,
    SettingsWrapper,
    StyledUL,
    StyledLink,
	Accordion
};
