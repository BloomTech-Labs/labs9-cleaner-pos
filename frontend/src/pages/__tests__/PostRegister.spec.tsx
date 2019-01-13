import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest';
import 'jest-dom/extend-expect';
import PostRegister from '../PostRegister';

afterEach(cleanup);

describe('PostRegister Component', () => {
  test('should render with the expected amount of inputs', () => {
    // @ts-ignore
    const { container } = render(<PostRegister />);
    const inputs = container.querySelectorAll('input');
    const input = document.createElement('input');
    expect(inputs[0]).toMatchObject(input);
  });
});
