import React from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import Accordion from '../../components/Accordion';
import {
	SubBox,
	AccUL,
	Confirmation,
	ConfUL,
} from './Billing.Styling';

const Billing = () => {
  return (
    <Container>
		<h2>Billing</h2>
		<SubBox>
			<Accordion title="Subscribe Here"
				onToggle={show => {
					console.log('sub', show);
				}}
			>
				<AccUL>
					<li><Stripe /></li>
				</AccUL>
			</Accordion>
		</SubBox>
		<Confirmation>
			<Accordion title="Confirmation"
				onToggle={show => {
					console.log('conf', show);
				}}
			>
				<ConfUL>
					<li>Child of Confirmation</li>
				</ConfUL>
			</Accordion>
		</Confirmation>
    </Container>
  );
};

export default Billing;
