import React from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import styled from '@emotion/styled';

const Panel = styled('ul')`
	list-style-type: none;
	float:left;
	text-align: left;
	padding: 30px;
	width: 300px;
	background-color:#f1f1f1;
`;

const Li = styled('li')`
`;

const Accordion = styled('button')`
	color: green;
	text-align: left
`;
 


const Billing = () => {
  return (
    <Container>
		<div>
			<Panel>
				<Li><Accordion>Choose Your Plan</Accordion></Li>
				<Li><Accordion>Enter Your Payment Information</Accordion></Li>
				<Li><Accordion>Confirm Your Subscription</Accordion></Li>
			</Panel>
		</div>
        <Stripe />
    </Container>
  );
};

export default Billing;
