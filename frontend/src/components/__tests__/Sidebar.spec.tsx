import React from 'react';
import Sidebar from '../shared_components/Sidebar';
import { render, cleanup } from 'react-testing-library';
import 'jest';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe.skip('Sidebar page', () => {
  test('should render a container', () => {
    const { container } = render(<Sidebar />);
  });
});
