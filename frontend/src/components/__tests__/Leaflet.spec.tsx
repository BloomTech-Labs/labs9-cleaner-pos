import React from 'react';
import LeafletMap from '../Leaflet/Leaflet';
import { cleanup } from 'react-testing-library';
import { renderWithRouter } from '../../helpers/functions';
import 'jest';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('Map ', () => {
  test.skip('should render in a div', () => {
    const { container } = renderWithRouter(<LeafletMap />, {});
    const div = container.querySelectorAll('div');
    expect(div.length).toBeGreaterThanOrEqual(1);
  });
});
