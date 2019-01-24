import styled from '@emotion/styled';

const Wrapper = styled('div')`
	border: 1px solid black;
	display:flex;
	flex-direction: column;
	align-items: center;
	text-align: left;
`;

const SubBox = styled('div')`
	border: 1px solid red;
`;

const AccUL = styled('ul')`
	text-decoration: none;
`;

const AccLI = styled('li')`
`;

const Confirmation = styled('div')`
	border: 1px solid green;
`;

export {
	Wrapper,
	SubBox,
	AccUL,
	Confirmation,
};
