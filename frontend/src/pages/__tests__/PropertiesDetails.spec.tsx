import React from 'react';
import { PropertiesDetail } from '../index';
import { renderWithRouter } from '../../helpers/functions';
import 'jest';
import { waitForElement, cleanup, fireEvent } from 'react-testing-library';
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
localStorage.setItem('token', 'testToken!');

describe('Houses detail', () => {
  test.skip('should render passed in data', async () => {
    const { container, debug, getAllByTestId } = renderWithRouter(
      <PropertiesDetail location={{ state: 1 }} match={{ params: 1 }} />,
      {},
    );

    const pDetail = await waitForElement(() => getAllByTestId('house-detail'));

    expect(pDetail[0].textContent).toContain('');
  });

  test.skip('should find all after lists', async () => {
    const { container, debug, getAllByTestId } = renderWithRouter(
      <PropertiesDetail location={{ state: 1 }} match={{ params: 1 }} />,
      {},
    );

    const pDetail = await waitForElement(() => getAllByTestId('after-list'));

    expect(pDetail.length).toBe(6);
  });

  test.skip('have submit button after clicking add stay', async () => {
    const {
      container,
      debug,
      getByText,
      getAllByPlaceholderText,
    } = renderWithRouter(
      <PropertiesDetail location={{ state: 1 }} match={{ params: 1 }} />,
      {},
    );

    const pDetail = await waitForElement(() => getByText('+ New Stay List'));
    fireEvent.click(pDetail);
    const p2Detail = await waitForElement(() =>
      getAllByPlaceholderText('Number of hours'),
    );
    expect(p2Detail.length).toBe(1);
  });
});

const mockData = {
  before: [
    {
      list_id: 3,
      task: 'clean 3',
      items_id: 3,
    },
    {
      list_id: 3,
      task: 'clean 15',
      items_id: 15,
    },
  ],
  before_id: 3,
  during: [
    {
      list_id: 6,
      task: 'clean 6',
      items_id: 6,
    },
    {
      list_id: 6,
      task: 'clean 18',
      items_id: 18,
    },
  ],
  during_id: 6,
  after: [
    {
      after_id: 11,
      time: '6 Hours After Stay',
      afterLists: [
        {
          task: 'clean 11',
          items_id: 11,
        },
        {
          task: 'clean 23',
          items_id: 23,
        },
        {
          task: 'test',
          items_id: 36,
        },
      ],
    },
    {
      after_id: 12,
      time: '2 Hours After Stay',
      afterLists: [
        {
          task: 'clean 12',
          items_id: 12,
        },
        {
          task: 'clean 24',
          items_id: 24,
        },
      ],
    },
    {
      after_id: 13,
      time: 'null Hours After Stay',
      afterLists: [
        {
          task: 'so close',
          items_id: 42,
        },
      ],
    },
    {
      after_id: 14,
      time: '7 Hours After Stay',
      afterLists: [
        {
          task: 'something',
          items_id: 38,
        },
      ],
    },
    {
      after_id: 15,
      time: '10 Hours After Stay',
      afterLists: [
        {
          task: 'god this is a log of work',
          items_id: 41,
        },
      ],
    },
    {
      after_id: 16,
      time: '99 Hours After Stay',
      afterLists: [
        {
          task: 'yo',
          items_id: 43,
        },
      ],
    },
  ],
};
