import React from 'react';
import { Settings } from '../index';
import { renderWithRouter } from '../../helpers/functions';
import 'jest';
import 'jest-dom/extend-expect';
import { waitForElement, cleanup, wait } from 'react-testing-library';
import { withRouter } from 'react-router';

afterEach(cleanup);
const props: any = {
  location: { search: 'code=34134123dsfasfdads' },
  history: {},
  match: {},
};

describe('Settings dashboard', () => {
  test('should indluce a button with the text Save Settings', async () => {
    const { getAllByText } = renderWithRouter(<Settings {...props} />, {});
    const buttons = await waitForElement(() =>
      getAllByText(/connect with stripe/i),
    );
    await wait(() => {
      expect(buttons.length).toBe(1);
    });
  });
  test('should include a button with the text Update Contact Info', async () => {
    const { getAllByText } = renderWithRouter(<Settings {...props} />, {});
    const buttons = await waitForElement(() =>
      getAllByText(/Update Contact Info/i),
    );
    await wait(() => {
      expect(buttons.length).toBe(1);
    });
  });
});
