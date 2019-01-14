import React from 'react';
import Sidebar from '../shared_components/Sidebar';
import { cleanup } from 'react-testing-library';
import { renderWithRouter } from '../../helpers/functions';
import 'jest';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('Sidebar page', () => {
  test('should render an unordered list', () => {
    const { container } = renderWithRouter(<Sidebar />, {});
    const ul = container.querySelectorAll('ul');
    expect(ul.length).toBeGreaterThanOrEqual(1);
  });

  test('should render seven list items', () => {
    const { container } = renderWithRouter(<Sidebar />, {});
    const li = container.querySelectorAll('li');
    expect(li.length).toBe(7);
  });
});
