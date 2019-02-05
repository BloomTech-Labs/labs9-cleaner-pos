import React, { useState } from 'react';
import Stripe from './index';
import { Button, Container } from '../../components/index';
import Accordion, {
  AccordionItemBody,
} from '../../components/Accordion/Accordion';
import { Link } from 'react-router-dom';
import { SubBox, Confirmation, Header } from './Billing.Styling';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleOutline from '@material-ui/core/Icon/';

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
          <div
            style={{
              border: 'var(--border)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '50%',
                background: 'white',
              }}
            >
              <List style={{ padding: '0' }}>
                <ListSubheader
                  style={{
                    background: 'var(--color-bg-main)',
                    height: '63px',
                    verticalAlign: 'center',
                  }}
                >
                  Lodgel Basic
                </ListSubheader>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-check-square' />
                  </Avatar>
                  <ListItemText
                    primary='One Month Free Trial'
                    secondary='Risk free trial'
                  />
                </ListItem>
                <ListItem>
                  <ListItemText>We help you make money</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Charge 1% of Earning</ListItemText>
                </ListItem>
              </List>
            </div>
            <div
              style={{
                width: '100%',
                height: '50%',
                border: 'var(--border)',
                background: 'white',
              }}
            >
              <List style={{ padding: '0' }}>
                <ListSubheader style={{ background: 'var(--color-bg-main)' }}>
                  Lodgel Professional
                </ListSubheader>
                <ListItem>
                  <ListItemText>
                    <i className='fa fa-check-square checkmark' />
                    {'  '}
                    14 Days Free Trial
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Up to 5 Houses</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>14 Days Free Trial</ListItemText>
                </ListItem>
              </List>
            </div>
          </div>
        </BillingContext.Provider>
      </SubBox>
    </Container>
  );
};

export default Billing;
