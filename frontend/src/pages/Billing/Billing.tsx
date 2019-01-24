import React from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import Accordion from '../../components/Accordion';
import Example from '../../components/Example';

const Billing = () => {
  return (
    <Container>
      <div>
        <Example />
      </div>
      <Stripe />
    </Container>
  );
};

export default Billing;
