import React, { FunctionComponent } from 'react';
import { render, cleanup } from 'react-testing-library';
import Login from '../Login';
import 'jest';

jest.mock('react-firebaseui/StyledFirebaseAuth', () => () => {
  return <div>Hellooo</div>;
});

afterEach(cleanup);
describe('Login component', () => {
  test('should render the login component displaying a button for every OAuth provider', () => {
    const { getByText } = render(<Login />);
    const buttonOne = getByText('Hellooo');
  });
});
