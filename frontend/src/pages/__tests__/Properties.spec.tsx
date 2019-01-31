import React from 'react';
import { Properties } from '../index';
import { renderWithRouter } from '../../helpers/functions';
import 'jest';
import 'jest-dom/extend-expect';
import { waitForElement, cleanup, flushEffects } from 'react-testing-library';

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

describe('Houses dashboard', () => {
  test.skip('should render a house card for every house received through axios call', async () => {
    const { getAllByTestId } = renderWithRouter(<Properties />, {});
    const houseCards = await waitForElement(() => getAllByTestId('house-item'));
    expect(houseCards.length).toBe(mockData.length);
  });

  test.skip('should include 2 buttons for every house card,', async () => {
    const { getAllByTestId } = renderWithRouter(<Properties />, {});

    const buttons = await waitForElement(() => getAllByTestId('house-button'));
    expect(buttons.length).toBe(mockData.length * 2);
  });

  test.skip('should include 1 button "Edit Checklists" for every house card', async () => {
    const { getAllByText } = renderWithRouter(<Properties />, {});

    const buttons = await waitForElement(() =>
      getAllByText(/edit checklists/i),
    );
    expect(buttons.length).toBe(mockData.length);
  });

  test.skip('should include 1 button "Edit Resources" for every house card', async () => {
    const { getAllByText } = renderWithRouter(<Properties />, {});

    const buttons = await waitForElement(() => getAllByText(/edit resources/i));
    expect(buttons.length).toBe(mockData.length);
  });

  test.skip('should render a select element for every house card', async () => {
    const { getAllByTestId } = renderWithRouter(<Properties />, {});
    flushEffects();
    const selectElements = await waitForElement(() =>
      getAllByTestId('assistant-select'),
    );
    expect(selectElements.length).toBe(3);
  });

  test.skip('should display the name of the default_ast for every house according to mockData', async () => {
    const { getAllByTestId } = renderWithRouter(<Properties />, {});
    flushEffects();
    const selectElements = await waitForElement(() =>
      getAllByTestId('assistant-select'),
    );
    for (let i = 0; i < 3; i++) {
      expect(selectElements[i].firstChild).toHaveTextContent(
        mockData[i].default_ast_name,
      );
    }
  });

  test.skip('should have an option for every assistant per house according to mockData', async () => {
    const { getAllByTestId } = renderWithRouter(<Properties />, {});
    flushEffects();
    const selectElements = await waitForElement(() =>
      getAllByTestId('assistant-select'),
    );
    for (let i = 0; i < 3; i++) {
      expect(selectElements[i].children).toHaveLength(
        mockData[i].openAst.length,
      );
    }
  });
});

const mockData = [
  {
    address: '123 go duck yourself ave',
    ast_guide: null,
    cleaning_fee: '65.00',
    created_at: '2019-01-11T21:48:05.233Z',
    default_ast: 1,
    default_ast_name: 'dude mcdudat',
    extra_guest_fee: '30.00',
    guest_guide: null,
    id: 1,
    manager: 1,
    name: 'house name 1',
    price: '450.50',
    openAst: [
      {
        full_name: 'Big Stevo',
        ast_id: 1,
        house_id: 1,
      },
      {
        full_name: 'Gary Lower',
        ast_id: 2,
        house_id: 1,
      },
      {
        full_name: 'Bill Fauch',
        ast_id: 3,
        house_id: 1,
      },
      {
        full_name: 'John David',
        ast_id: 4,
        house_id: 1,
      },
    ],
    checkList: [
      {
        count: '8',
      },
    ],
  },
  {
    address: '123 go duck yourself st',
    ast_guide: null,
    cleaning_fee: '65.00',
    created_at: '2019-01-11T21:48:05.233Z',
    default_ast: 1,
    default_ast_name: 'dude mcdudat',
    extra_guest_fee: '30.00',
    guest_guide: null,
    id: 2,
    manager: 1,
    name: 'house name 2',
    price: '450.50',
    openAst: [
      {
        full_name: 'Big Stevo',
        ast_id: 1,
        house_id: 1,
      },
      {
        full_name: 'Gary Lower',
        ast_id: 2,
        house_id: 1,
      },
      {
        full_name: 'Bill Fauch',
        ast_id: 3,
        house_id: 1,
      },
      {
        full_name: 'John David',
        ast_id: 4,
        house_id: 1,
      },
    ],
    checkList: [
      {
        count: '8',
      },
    ],
  },
  {
    address: '123 go duck yourself ln',
    ast_guide: null,
    cleaning_fee: '65.00',
    created_at: '2019-01-11T21:48:05.233Z',
    default_ast: 1,
    default_ast_name: 'dude mcdudat',
    extra_guest_fee: '30.00',
    guest_guide: null,
    id: 3,
    manager: 1,
    name: 'house name 3',
    price: '450.50',
    openAst: [
      {
        full_name: 'Big Stevo',
        ast_id: 1,
        house_id: 1,
      },
      {
        full_name: 'Gary Lower',
        ast_id: 2,
        house_id: 1,
      },
      {
        full_name: 'Bill Fauch',
        ast_id: 3,
        house_id: 1,
      },
      {
        full_name: 'John David',
        ast_id: 4,
        house_id: 1,
      },
    ],
    checkList: [
      {
        count: '8',
      },
    ],
  },
];
