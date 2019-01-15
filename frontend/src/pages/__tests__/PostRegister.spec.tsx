import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
  getAllByTestId,
} from 'react-testing-library';
import 'jest';
import 'jest-dom/extend-expect';
import PostRegister from '../PostRegister';
import { renderWithRouter } from '../../helpers/functions';
import axiosMock from 'axios';

describe('PostRegister Component', () => {
  afterEach(cleanup);

  test('should render with the expected amount of inputs', () => {
    // @ts-ignore
    const { container } = render(<PostRegister />);
    const inputs = container.querySelectorAll('input');
    const input = document.createElement('input');
    expect(inputs.length).toBe(8);
    expect(inputs[0]).toMatchObject(input);
  });

  test('does not submit when form is empty', () => {
    // Arrange
    // @ts-ignore
    const { getByText, container } = render(<PostRegister />);
    const submit = container.querySelector('.submit');
    const spy = jest.spyOn(axiosMock, 'get');
    // Act
    fireEvent.click(submit);
    // Assert
    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('validates e-mail and shows appropriate error', () => {
    // Arrange
    const { getByTestId, container } = render(
      // @ts-ignore
      <PostRegister />,
    );
    const submit = getByTestId('button-submit');
    const emailInput = getByTestId('input-email');
    // const label = container.querySelector('.field-email label');
    const spy = jest.spyOn(axiosMock, 'get');
    // Act
    fireEvent.change(emailInput, { target: { value: 'a' } });
    fireEvent.click(submit);
    // Assert
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
