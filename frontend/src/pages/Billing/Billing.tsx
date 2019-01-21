import React from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import Accordion from '../../components/Accordion';
import Example from '../../components/shared_components/Example';

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
