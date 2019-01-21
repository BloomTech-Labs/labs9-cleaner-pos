import React from 'react';
import { Guests } from '../index';
import { renderWithRouter } from '../../helpers/functions';
import 'jest';
import { waitForElement, cleanup } from 'react-testing-library';

// Mock data for mock axios to return
const mockdata = [
  {
    stay_id: 1,
    house_id: 1,
    guest_name: 'Harald Junke',
    house_name: 'house name 1',
    check_in: '2018-01-27T08:00:00.000Z',
    check_out: '2018-01-30T08:00:00.000Z',
    progress: 50,
  },
  {
    stay_id: 3,
    house_id: 2,
    guest_name: 'Harald Junke',
    house_name: 'house name 2',
    check_in: '2019-02-25T08:00:00.000Z',
    check_out: '2019-02-28T08:00:00.000Z',
    progress: 0,
  },
  {
    stay_id: 2,
    house_id: 1,
    guest_name: 'Gerhard Schroeder',
    house_name: 'house name 1',
    check_in: '2019-02-25T08:00:00.000Z',
    check_out: '2019-02-28T08:00:00.000Z',
    progress: 0,
  },
];

// Mock axios
jest.mock('axios', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: mockdata,
      }),
    ),
  };
});

// Mock local storage
const getItemSpy = jest.spyOn(
  Object.getPrototypeOf(window.localStorage),
  'getItem',
);

getItemSpy.mockImplementation(() => 'whatever');

afterEach(cleanup);

describe('Guests dashboard', () => {
  test('should render a guest card for every guest received through axios', async () => {
    const { getAllByTestId } = renderWithRouter(<Guests />, {});
    const guestCards = await waitForElement(() => getAllByTestId('guest-card'));
    expect(guestCards.length).toBe(mockdata.length);
  });
});
