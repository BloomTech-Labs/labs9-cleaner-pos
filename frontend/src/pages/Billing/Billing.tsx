import React from 'react';
import Stripe from './index';
import { Container } from '../../components/index';

const Billing = () => {
  return (
    <Container>
      <div>
        <Accordion title='OUR AWESOME ACCORDION' />
        <Example />
      </div>
      <Stripe />
    </Container>
  );
};

export default Billing;
