import React from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import Accordion from '../../components/Accordion';
import { SubBox, AccUL, Confirmation, ConfUL, Header } from './Billing.Styling';

const Billing = () => {
  return (
    <Container>
      <Header>Billing</Header>
      <SubBox>
        <Accordion
          title='Click here to subscribe'
          onToggle={(show) => {
            console.log('sub', show);
          }}
        >
          <AccUL>
            <li>
              <Stripe />
            </li>
          </AccUL>
        </Accordion>
      </SubBox>
      <Confirmation>
        <h3>Confirmation:</h3>
      </Confirmation>
    </Container>
  );
};

export default Billing;
