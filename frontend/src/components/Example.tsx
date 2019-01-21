import React from 'react';
import ReactDOM from 'react-dom';

import Accordion from './Accordion';

const Example = () => {
  return (
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
  );
};

export default Example;
