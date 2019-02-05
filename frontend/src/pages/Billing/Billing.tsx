import React, { useState, useContext, Dispatch } from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import {
  SubBox,
  AccordionItemBody,
  Confirmation,
  ConfUL,
  Header,
} from './Billing.Styling';
import Accordion from '../../components/Accordion/Accordion';

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
            <title>Subscribe here! 💰</title>
            <AccordionItemBody>
              <Stripe />
            </AccordionItemBody>

            <title>All the confirmations 😇</title>
            <AccordionItemBody>
              {!!(confirm.confirm && confirm.confirm.plan) ? (
                <h3>Welcome to Lodgel Professional!</h3>
              ) : null}
            </AccordionItemBody>
          </Accordion>
        </BillingContext.Provider>
      </SubBox>
    </Container>
  );
};

export default Billing;
