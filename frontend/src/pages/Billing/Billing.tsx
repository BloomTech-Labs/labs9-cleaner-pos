import React from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
//import Accordion from '../../components/Accordion';
import BillingAccordion from './BillingAccordion';

const Billing = () => {
  return (
    <Container>
       	<BillingAccordion />
{/*      <Stripe />*/}
    </Container>
  );
};

export default Billing;
