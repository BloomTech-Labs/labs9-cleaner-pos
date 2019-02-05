import React, { useState, useContext } from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import Accordion from '../../components/Accordion';
import { SubBox, AccUL, Confirmation, ConfUL, Header } from './Billing.Styling';
import { UserContext } from '../../App';

export const BillingContext = React.createContext({
  setConfirm: null as any,
  setSub: null as any,
});

const Billing = () => {
  const [confirm, setConfirm] = useState<any>({});
  const { setSub } = useContext(UserContext);
  return (
    <Container>
      <Header>Billing</Header>
      <SubBox>
        <Accordion
          title='Click here to subscribe'
          // onToggle={(show) => {
          //   console.log('sub', show);
          // }}
        >
          <AccUL>
            <li>
              <BillingContext.Provider value={{ setConfirm, setSub }}>
                <Stripe />
              </BillingContext.Provider>
            </li>
          </AccUL>
        </Accordion>
      </SubBox>
      <Confirmation>
        <h3>Confirmation: </h3>
        {confirm.confirm && (
          <h3> You have successfully subscribed, thank you!</h3>
        )}
      </Confirmation>
    </Container>
  );
};

export default Billing;
