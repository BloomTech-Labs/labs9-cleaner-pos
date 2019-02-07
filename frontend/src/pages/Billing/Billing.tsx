import React, { useState } from 'react';
import Stripe from './index';
import { Button, Container } from '../../components/index';
import Accordion, {
  AccordionItemBody,
} from '../../components/Accordion/Accordion';
import { Link } from 'react-router-dom';
import {
  DescriptionContainer,
  Header,
  ListContainer,
  SVGContainer,
  SubBox,
} from './Billing.Styling';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';

export const BillingContext = React.createContext({
  setConfirm: null as any,
  setShownIndex: null as any,
});

const Billing = () => {
  const [confirm, setConfirm] = useState<any>({});
  const [shownIndex, setShownIndex] = useState(0);

  return (
    <Container>
      <Header>Subscription</Header>
      <SubBox>
        <BillingContext.Provider value={{ setConfirm, setShownIndex }}>
          <Accordion index={shownIndex} setIndex={setShownIndex}>
            <AccordionItemBody>
              <Stripe />
            </AccordionItemBody>

            <AccordionItemBody>
              {!!(confirm.confirm && confirm.confirm.plan) ? (
                <div style={{ textAlign: 'center' }}>
                  <h3>Thank You!</h3>
                  <SVGContainer>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='128'
                      height='128'
                      viewBox='-263.5 236.5 26 26'
                    >
                      <g className='svg-success'>
                        <circle cx='-250.5' cy='249.5' r='12' />
                        <path d='M-256.46 249.65l3.9 3.74 8.02-7.8' />
                      </g>
                    </svg>
                  </SVGContainer>
                  <h3>Welcome to Lodgel!</h3>
                  <Link to='/properties'>
                    <Button
                      text='To My Properties'
                      color='var(--color-accent-alt)'
                    />
                  </Link>
                </div>
              ) : null}
            </AccordionItemBody>
          </Accordion>
          <DescriptionContainer>
            <ListContainer>
              <List
                style={{ padding: '0', background: 'var(--color-main-light)' }}
              >
                <ListSubheader
                  classes={{ root: 'list-subheader' }}
                  style={{
                    border: 'var(--border)',
                    height: '3.75rem',
                    padding: '0.5rem',
                    background: 'var(--color-accent)',
                    color: 'var(--color-main-light)',
                    marginBottom: '1rem',
                  }}
                >
                  <h3 style={{ margin: '0' }}>Lodgel Basic</h3>
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
                  <Avatar>
                    <i className='fas fa-dollar-sign' />
                  </Avatar>
                  <ListItemText
                    primary='We help you make money'
                    secondary='Our users save an average of 20% of their time invested managing their properties!'
                  />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-percentage' />
                  </Avatar>
                  <ListItemText
                    primary='Charge 1.5% of Earnings'
                    secondary='Once you’re happy and making money, we charge 1.5% of booking earnings.'
                  />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-hashtag' />
                  </Avatar>
                  <ListItemText
                    primary='Up to 5 properties'
                    secondary='Scale up your rental business without risks and as convenient as possible'
                  />
                </ListItem>
              </List>
            </ListContainer>
            <ListContainer>
              <List style={{ padding: '0' }}>
                <ListSubheader
                  style={{
                    borderBottom: 'var(--border)',
                    height: '62px',
                    padding: '0.5rem',
                    background: 'var(--color-accent)',
                    color: 'var(--color-main-light)',
                    marginBottom: '1rem',
                  }}
                >
                  <h3 style={{ margin: '0' }}>Lodgel Professional</h3>
                </ListSubheader>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-check-square' />
                  </Avatar>
                  <ListItemText
                    primary='Only 99$ Per Month'
                    secondary='Reduce transaction costs immediately'
                  />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-dollar-sign' />
                  </Avatar>
                  <ListItemText
                    primary='We help you make money'
                    secondary='Our users save an average of 20% of their time invested managing their properties!'
                  />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-percentage' />
                  </Avatar>
                  <ListItemText
                    primary='Charge 1% of Earnings'
                    secondary='Once you’re happy and making money, we charge 1% of booking earnings.'
                  />
                </ListItem>
                <ListItem>
                  <Avatar>
                    <i className='fas fa-hashtag' />
                  </Avatar>
                  <ListItemText
                    primary='Unlimited amount of properties'
                    secondary='Scale your business effortlessly with Lodgel!'
                  />
                </ListItem>
              </List>
            </ListContainer>
          </DescriptionContainer>
        </BillingContext.Provider>
      </SubBox>
    </Container>
  );
};

export default Billing;
