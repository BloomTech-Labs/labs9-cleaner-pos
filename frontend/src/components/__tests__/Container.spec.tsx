import React from 'react';
import { Container } from '../index';
import { render, cleanup } from 'react-testing-library';
import 'jest';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('Container component', () => {
  test('should render a simple div element if no children are passed', () => {
    const { container } = render(<Container />);
    const div = container.querySelectorAll('div');
    expect(div.length).toBe(1);
  });

  test('should have a className assigned by jss & a grey background', () => {
    const { container } = render(<Container />);
    const div = container.querySelector('div');
    expect(div).toHaveStyle('display: flex');
    expect(div.classList.length).toBe(1);
  });

  test('should render an unlimited amount of children if passed', () => {
    const { container, getByText } = render(
      <Container>
        <div>Test test test</div>
        <h1>MOAR TEST</h1>
      </Container>,
    );
    const h1 = getByText(/moar test/i);
    const divs = container.querySelectorAll('div');
    expect(h1).toBeInTheDocument();
    expect(divs.length).toBe(2);
  });
});
