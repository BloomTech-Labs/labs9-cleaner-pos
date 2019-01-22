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
        console.log('show -->', show);
      }}
    >
      <ul>
        <li>
          <span>example1</span>
        </li>
        <li>
          <span>example2</span>
        </li>
        <li>
          <span>example3</span>
        </li>
      </ul>
    </Accordion>
	<Accordion
		title="Another accordion"
		onToggle={(show) => {
			console.log('2nd', show);
		}}
	>
		<ul>
			<li>
				<span>Listen, do you want to know a secret? Do you promise not to tell?</span>
			</li>
		</ul>
	</Accordion>
	</div>
  );
};

export default Example;
