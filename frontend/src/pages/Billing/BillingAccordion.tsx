import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import Accordion from '../../components/Accordion';
import Stripe from './index';

const Example = () => {
  return (
	<div>
    	<Accordion
			title='Subscribe'
			onToggle={(show) => {
				console.log('show', show);
			}}	
		>
			<ul>
				<li><Stripe /></li>
			</ul>
		</Accordion>
{/*	To me, it doesn't make a lot of sense to have this here if we're putting Stripe under the Subscribe part of the menu
		<Accordion title='Credit Card'>
			<li>
				<ul> Something here</ul>
			</li>
		</Accordion>*/}
		<Accordion title='Confirmation'>
			<ul>
				<li>Child of Confirmation</li>
			</ul>
		</Accordion>
	</div>
  )
};

export default Example;
