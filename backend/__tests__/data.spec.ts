import 'jest';
/* tslint:disable-next-line */
require('dotenv').config();

import knexfile from '../knexfile';

const db = knexfile.development;

describe('true is true', () => {
  test('should be true', () => {
    expect(true).toBe(true);
  });
});
