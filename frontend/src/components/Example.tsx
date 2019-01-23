import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import Accordion from './Accordion';


const Example = () => {
  return (
	<div>
    	<Accordion
			title='Accordion Title'
			onToggle={(show) => {
				console.log('show', show);
			}}
		>
			<ul>
				<Accordion title='Inner Accordion'>
					<Accordion title='Deep Inner Accordionness'>
						<Accordion title='Another one'>
						</Accordion>
					</Accordion>
				</Accordion>
			</ul>
		</Accordion>
	</div>
  )
};

export default Example;
