import React from 'react';
import ReactDOM from 'react-dom';
import 'jest';

import Button from '../shared_components/Button';

describe('<Button />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Button />, div);
    });
  });