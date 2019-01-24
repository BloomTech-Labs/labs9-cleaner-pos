import React from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import Accordion from '../../components/Accordion';
import {
	Wrapper,
	SubBox,
	AccUL,
	Confirmation,
} from './Billing.Styling';

const Billing = () => {
  return (
    <Container>
		<Wrapper>
			<SubBox>
				<Accordion title="Subscribe">
					<AccUL>
						<li><Stripe /></li>
					</AccUL>
				</Accordion>
			</SubBox>
			<Confirmation>
				<Accordion title="Confirmation">
					<AccUL>
						<li>Child of Confirmation</li>
					</AccUL>
				</Accordion>
			</Confirmation>
		</Wrapper>
    </Container>
  );
};

export default Billing;
