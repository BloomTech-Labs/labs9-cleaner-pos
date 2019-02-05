import React, { useState, useContext, ChangeEvent } from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import { SubBox, AccUL, Confirmation, ConfUL, Header } from './Billing.Styling';
import styled from '@emotion/styled';

// const {
//   Accordion,
//   AccordionItem,
//   AccordionItemTitle,
//   AccordionItemBody,
// } = accordion;

export const BillingContext = React.createContext({
  setConfirm: null as any,
  setShowItem: null as any,
});

const Billing = () => {
  const [confirm, setConfirm] = useState<any>({});
  const [showItem, setShowItem] = useState(true);
  return (
    <Container>
      <Header>Billing</Header>
      <SubBox>
        <Accordion>
          <AccordionItemHeader aria-level={3}>Billing</AccordionItemHeader>
          <AccordionItemBody
            className={
              showItem ? 'accordion__item box' : 'accordion__item hidden'
            }
          >
            <BillingContext.Provider value={{ setConfirm, setShowItem }}>
              <Stripe />
            </BillingContext.Provider>
          </AccordionItemBody>
          <AccordionItemHeader>Billing</AccordionItemHeader>
          <AccordionItemBody
            className={
              showItem ? 'accordion__item hidden' : 'accordion__item box'
            }
          >
            Confirm dis awesome subscription!!
          </AccordionItemBody>
        </Accordion>
      </SubBox>
    </Container>
  );
};

export default Billing;

const Accordion = styled('dl')``;
const AccordionItemHeader = styled('dt')`
  background: var(--color-bg-main);
`;
const AccordionItemBody = styled('dd')``;
