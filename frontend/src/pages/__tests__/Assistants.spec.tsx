import React from 'react';
import { Assistants } from '../index';
import { renderWithRouter } from '../../helpers/functions';
import 'jest';
import { waitForElement, cleanup, wait } from 'react-testing-library';

jest.mock('axios', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: mockData,
      }),
    ),
  };
});

localStorage.setItem('token', 'testToken!');

afterEach(cleanup);

// modified these tests to use mock data
describe('Houses dashboard', () => {
  test.skip('should render an assistant card for every assistant received through axios call', async () => {
    const { getAllByTestId } = renderWithRouter(<Assistants />, {});

    const assistantCards = await waitForElement(() =>
      getAllByTestId('assistant-item'),
    );
    await wait(() => {
      expect(assistantCards.length).toBe(3);
    });
  });

  test.skip('should include 1 button for every assistant card,', async () => {
    const { getAllByTestId, rerender } = renderWithRouter(<Assistants />, {});

    const buttons = await waitForElement(() =>
      getAllByTestId('assistant-button'),
    );
    await wait(() => {
      expect(buttons.length).toBe(3);
    });
  });
});

const mockData = [
  {
    address: null,
    ast_id: 1,
    full_name: 'Big Stevo 1',
    houseCount: 1,
    itemCount: 8,
    openAst: [{ house_id: 1 }],
    photo_url: null,
    user_id: 4,
  },
  {
    address: null,
    ast_id: 2,
    full_name: 'Big Stevo 1',
    houseCount: 1,
    itemCount: 8,
    openAst: [{ house_id: 1 }],
    photo_url: null,
    user_id: 4,
  },
  {
    address: null,
    ast_id: 3,
    full_name: 'Big Stevo 1',
    houseCount: 1,
    itemCount: 8,
    openAst: [{ house_id: 1 }],
    photo_url: null,
    user_id: 4,
  },
];
