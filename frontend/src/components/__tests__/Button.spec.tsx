import React from 'react';
import Button from '../shared_components/Button';
import { render } from 'react-testing-library';
import 'jest';
import 'jest-dom/extend-expect';

describe('Button component', () => {
  test.skip('should render a Button', () => {
    const spy = jest.fn();
    const text = 'This is a test';
    const { container } = render(
      <Button onClick={spy} text={text} data-testid='button-test' />,
    );
    const button = container.firstChild;
    expect(button).toHaveTextContent(text);
  });
});
