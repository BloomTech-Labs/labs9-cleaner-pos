import React from 'react';
import Button from '../Button';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('Button page', () => {
  test('should render a Button', () => {
    const { container } = render(<Button />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(1);
  });

  test('should display the correct text on the Button', () => {
    const text = 'This is a test';
    const { getByText } = render(<Button text={text} />);
    const button = getByText(text);
    expect(button).toHaveTextContent(text);
  });

  test('should carry the correct onClick handler', () => {
    const mock = jest.fn();
    const { container } = render(<Button onClick={mock} />);
    const button = container.querySelector('button');

    fireEvent.click(button);
    expect(mock).toHaveBeenCalledTimes(1);
    fireEvent.click(button);
    expect(mock).toHaveBeenCalledTimes(2);
  });

  test('should carry the correct data-testid', () => {
    const testid = 'randoButton';
    const { getByTestId } = render(<Button datatestid={testid} />);
    const button = getByTestId(testid);
    expect(button).toBeDefined();
  });
});
