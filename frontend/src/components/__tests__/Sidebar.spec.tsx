import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { cleanup } from 'react-testing-library';
import { renderWithRouter } from '../../helpers/functions';
import 'jest';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('Sidebar page', () => {
  test('should render an unordered list', () => {
    const { container } = renderWithRouter(<Sidebar />, {});
    const nav = container.querySelectorAll('nav');
    expect(nav.length).toBeGreaterThanOrEqual(1);
  });

  test('should render five list items', () => {
    const { container } = renderWithRouter(<Sidebar />, {});
    const links = container.querySelectorAll('div');
    expect(links.length).toBeGreaterThanOrEqual(5);
  });
});
