import React from 'react';
import { Checkout } from '../index';
import {
  cleanup,
  waitForElement,
  render,
  flushEffects,
} from 'react-testing-library';
import 'jest';
import 'jest-dom/extend-expect';

afterEach(cleanup);
const props: any = {
  location: { search: 'code=34134123dsfasfdads' },
  history: {},
  match: {
    params: {
      id: 1,
    },
  },
};

const mockData = {
  ast_guide: null,
  check_in: '2018-01-26T23:00:00.000Z',
  check_out: '2018-01-29T23:00:00.000Z',
  default_ast: 4,
  guest_guide: null,
  guest_name: 'Harald Junke',
  house_address: '123 go duck yourself ave',
  house_id: 1,
  house_name: 'house name 1',
};

// Mock of axios get request
jest.mock('axios', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: mockData,
      }),
    ),
  };
});

describe('Checkout Page UI', () => {
  test('should be rendering the Container component', () => {
    const { getByTestId } = render(<Checkout {...props} />);
    const container = getByTestId('container-component');
    expect(container).toBeTruthy();
  });

  test('should render a name from stay', async () => {
    const { getByTestId } = render(<Checkout {...props} />);
    const header = await waitForElement(() => getByTestId('guest-name'));
    expect(header).toHaveTextContent(mockData.guest_name);
  });
});
