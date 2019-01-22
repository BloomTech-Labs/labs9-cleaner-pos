import React from 'react';
import FileUpload from '../FileUpload';
import { render, cleanup } from 'react-testing-library';
import 'jest';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('FileUpoad', () => {
  test('should render a Button', () => {
    const { getByTestId } = render(<FileUpload />);
    const buttons = getByTestId('open-button');

    expect(buttons).toBeInTheDocument();
  });

  test('should render passed text', () => {
    const { container } = render(<FileUpload text='this is a thing' />);
    const buttons = container.querySelector('button');
    expect(buttons.textContent).toBe('this is a thing');
  });
});
