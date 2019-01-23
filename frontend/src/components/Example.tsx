import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import Accordion from './Accordion';

const Example = () => {
  return (
	<div>
    <Accordion
      title='example 1'
      onToggle={(show) => {
        console.log('show -->', show);
      }}
    >
		<ul>
			<li>Something here 1</li>
			<li>Maybe more</li>
		</ul>
	</Accordion>
	<Accordion
		title='example2'
		onToggle={(show) => {
			console.log('ex2', show);
		}}
	>
		<ul>
			<li>Something else here 2</li>
		</ul>
	</Accordion>
	</div>
  );
};

export default Example;
