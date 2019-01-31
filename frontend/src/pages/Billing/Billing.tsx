import React, { useState } from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import Accordion from '../../components/Accordion';
import { SubBox, AccUL, Confirmation, ConfUL, Header } from './Billing.Styling';

export const BillingContext = React.createContext({
  setConfirm: null as any,
});

const Billing = () => {
  const [confirm, setConfirm] = useState<any>({});
  console.log(confirm);
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
              <BillingContext.Provider value={{setConfirm}}>
                <Stripe />
              </BillingContext.Provider>
            </li>
          </AccUL>
        </Accordion>
      </SubBox>
      <Confirmation>
        <h3>Confirmation:</h3>
        {confirm.confirm && confirm.confirm.message}
      </Confirmation>
    </Container>
  );
};

export default Billing;
