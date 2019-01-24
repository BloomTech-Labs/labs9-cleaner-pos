import React from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import Accordion from '../../components/Accordion';

const Billing = () => {
  return (
    <Container>
		<Accordion title="Subscribe">
			<ul>
				<li><Stripe /></li>
			</ul>
		</Accordion>
		<Accordion title="Confirmation">
			<ul>
				<li>Child of Confirmation</li>
			</ul>
		</Accordion>
    </Container>
  );
};

export default Billing;
