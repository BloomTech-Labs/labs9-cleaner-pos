import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Login from '../Login';
import 'jest';

jest.mock('react-firebaseui/StyledFirebaseAuth', () => () => {
  return (
    <div>
      <button />
      <button />
      <button />
      <button />
      <button />
    </div>
  );
});

afterEach(cleanup);

describe('Login component', () => {
  test('should render the login component displaying a button for every OAuth provider', () => {
    // @ts-ignore
    const { container } = render(<Login />);
    const buttons = container.querySelectorAll('button');
    const button = document.createElement('button');
    expect(buttons.length).toBe(5);
    expect(buttons[0]).toMatchObject(button);
  });
});
