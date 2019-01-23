import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import Accordion from './Accordion';


const Example = () => {
  return (
	<div>
    	<Accordion
			title='Subscription'
			onToggle={(show) => {
				console.log('show', show);
			}}	
		>
			<ul>
				<Accordion title='Child 1 of Subscription'>
					<Accordion title='Child 2 of Subscription'>
					</Accordion>
				</Accordion>
			</ul>
		</Accordion>
		<Accordion title='Credit Card'>
			<li>
				<ul> Something here</ul>
			</li>
		</Accordion>
		<Accordion title='Confirmation'>
			<ul>
				<li>Child of Confirmation></li>
			</ul>
		</Accordion>
	</div>
  )
};

export default Example;
