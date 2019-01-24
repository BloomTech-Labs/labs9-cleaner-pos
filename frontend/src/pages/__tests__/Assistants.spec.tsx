import React from 'react';
import { Assistants } from '../index';
import { renderWithRouter } from '../../helpers/functions';
import 'jest';
import { waitForElement, cleanup } from 'react-testing-library';
jest.mock('axios', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: mockData,
      }),
    ),
  };
});
afterEach(cleanup);

// these tests will only pass if the data on the pg sever never changes.
// should prop use moke
describe('Houses dashboard', () => {
  test('should render an assistant card for every assistant received through axios call', async () => {
    const { getAllByTestId } = renderWithRouter(<Assistants />, {});
    const assistantCards = await waitForElement(() =>
      getAllByTestId('assistant-item'),
    );
    expect(assistantCards.length).toBe(3);
  });

  test('should include 1 button for every assistant card,', async () => {
    const { getAllByTestId } = renderWithRouter(<Assistants />, {});

    const buttons = await waitForElement(() =>
      getAllByTestId('assistant-button'),
    );
    expect(buttons.length).toBe(3);
  });
});

const mockData = [
  {
    id: 3,
    name: 'house name 3',
    address: '123 go duck yourself ln',
    default_ast: 3,
    default_ast_name: 'Bill Fauch',
    manager: 1,
    guest_guide: null,
    ast_guide: null,
    openAst: [
      {
        full_name: 'Bill Fauch',
        ast_id: 3,
        house_id: 3,
      },
    ],
    checkList: [
      {
        count: '13',
      },
    ],
  },
  {
    id: 3,
    name: 'house name 3',
    address: '123 go duck yourself ln',
    default_ast: 3,
    default_ast_name: 'Bill Fauch',
    manager: 1,
    guest_guide: null,
    ast_guide: null,
    openAst: [
      {
        full_name: 'Bill Fauch',
        ast_id: 3,
        house_id: 3,
      },
    ],
    checkList: [
      {
        count: '13',
      },
    ],
  },
  {
    id: 2,
    name: 'house name 2',
    address: '123 go duck yourself st',
    default_ast: 4,
    default_ast_name: 'John David',
    manager: 6,
    guest_guide: null,
    ast_guide: null,
    openAst: [
      {
        full_name: 'John David',
        ast_id: 4,
        house_id: 2,
      },
      {
        full_name: 'Luke Steve',
        ast_id: 5,
        house_id: 2,
      },
      {
        full_name: 'Willy Fauch',
        ast_id: 6,
        house_id: 2,
      },
      {
        full_name: 'Big Stevo',
        ast_id: 1,
        house_id: 2,
      },
      {
        full_name: 'Denver McDavid',
        ast_id: 23,
        house_id: 2,
      },
    ],
    checkList: [
      {
        count: '8',
      },
    ],
  },
];
