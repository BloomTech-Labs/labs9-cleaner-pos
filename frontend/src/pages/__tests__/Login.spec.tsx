import React from 'react';
import { cleanup, wait } from 'react-testing-library';
import { renderWithRouter } from '../../helpers/functions';
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

const props: any = {
  location: { search: 'code=34134123dsfasfdads' },
  history: {},
  match: {},
};

afterEach(cleanup);

describe('Login component', () => {
  test('should render the login component displaying a button for every OAuth provider', async () => {
    const { container } = renderWithRouter(<Login {...props} />, {});
    const buttons = container.querySelectorAll('button');
    const button = document.createElement('button');
    await wait(() => {
      expect(buttons.length).toBe(5);
      expect(buttons[0]).toMatchObject(button);
    });
  });
});
