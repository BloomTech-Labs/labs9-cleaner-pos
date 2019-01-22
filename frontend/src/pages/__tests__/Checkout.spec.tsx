import React from 'react';
import { Checkout } from '../index';
import { cleanup, waitForElement, render } from 'react-testing-library';
import { renderWithRouter } from '../../helpers/functions';
import 'jest';
import 'jest-dom/extend-expect';

afterEach(cleanup);
const props: any = {
  location: { search: 'code=34134123dsfasfdads' },
  history: {},
  match: {},
};

describe('Checkout Page UI', () => {
  test('should be render the Container component', () => {
    const { getByTestId } = render(<Checkout {...props} />);
    const container = getByTestId('container-component');
    expect(container).toBeTruthy();
  });
});
