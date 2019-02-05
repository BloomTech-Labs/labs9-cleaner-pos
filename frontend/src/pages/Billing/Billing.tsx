import React, { useState, useContext, Dispatch } from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import { SubBox, AccUL, Confirmation, ConfUL, Header } from './Billing.Styling';
import styled from '@emotion/styled';
import Accordion from './Accordion';

export const BillingContext = React.createContext({
  setConfirm: null as any,
  setShownIndex: null as any,
});

const Billing = () => {
  const [confirm, setConfirm] = useState<any>({});
  const [shownIndex, setShownIndex] = useState(1);

  return (
    <Container>
      <Header>Billing</Header>
      <SubBox>
        <BillingContext.Provider value={{ setConfirm, setShownIndex }}>
          <Accordion index={shownIndex} setIndex={setShownIndex}>
            <title>
              <h3>Subscribe here! :)</h3>
            </title>
            <div>
              <Stripe />
            </div>

            <title>All the confirmations 🙉</title>
            <div>
              {!!(confirm.confirm && confirm.confirm.plan) ? (
                <h3>Welcome to Lodgel Professional!</h3>
              ) : null}
            </div>
          </Accordion>
        </BillingContext.Provider>
      </SubBox>
    </Container>
  );
};

export default Billing;
