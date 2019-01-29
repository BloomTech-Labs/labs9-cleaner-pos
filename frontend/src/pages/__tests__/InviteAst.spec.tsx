import React from 'react';
import { InviteAst } from '../index';
import { renderWithRouter } from '../../helpers/functions';
import 'jest';
import axiosMock from 'axios';
import {
  waitForElement,
  cleanup,
  fireEvent,
  render,
  wait,
} from 'react-testing-library';
jest.mock('axios', () => {
  return {
    post: jest.fn(() =>
      Promise.resolve({
        data: mockData,
      }),
    ),
  };
});
afterEach(cleanup);

describe('Invite test', () => {
  test('should render 3 text inputs', () => {
    // @ts-ignore
    const { container } = render(<InviteAst />);
    const inputs = container.querySelectorAll('input');
    const input = document.createElement('input');
    expect(inputs.length).toBe(3);
    expect(inputs[0]).toMatchObject(input);
  });
  test('does not submit when form is empty', async () => {
    // Arrange
    // @ts-ignore
    const { getByText, container, debug } = render(<InviteAst />);
    const submit = container.querySelectorAll('button');
    const spy = jest.spyOn(axiosMock, 'post');
    // Act
    fireEvent.click(submit[0]);
    // Assert
    await wait(() => {
      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});

const mockData = {};
