import React from 'react';
import Stripe from './Stripe';
import { Container } from '../../components/index';

const Billing = () => {
  return (
    <Container>
      <Stripe />
    </Container>
  );
};

export default Billing;
