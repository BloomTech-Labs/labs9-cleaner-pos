import React, { useState } from 'react';
import Stripe from './index';
import { Button, Container } from '../../components/index';
import Accordion, {
  AccordionItemBody,
} from '../../components/Accordion/Accordion';
import { Link } from 'react-router-dom';
import { SubBox, Confirmation, ConfUL, Header } from './Billing.Styling';

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
            <title>Choose your plan!! 💰</title>
            <AccordionItemBody>
              <Stripe />
            </AccordionItemBody>

            <title>All the confirmations 😇</title>
            <AccordionItemBody>
              {!!(confirm.confirm && confirm.confirm.plan) ? (
                <>
                  <h3>Thank you for subscribing to Lodgel Professional!</h3>
                  <Confirmation>
                    <Link to='/properties'>
                      <Button text='Take me to my properties!' />
                    </Link>
                  </Confirmation>
                </>
              ) : null}
            </AccordionItemBody>
          </Accordion>
        </BillingContext.Provider>
      </SubBox>
    </Container>
  );
};

export default Billing;
