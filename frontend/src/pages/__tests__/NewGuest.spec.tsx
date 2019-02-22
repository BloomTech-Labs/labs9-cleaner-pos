import React from 'react';
// React-testing-library imports
import { cleanup, wait, render, fireEvent } from 'react-testing-library';
import { renderWithRouter } from '../../helpers/functions';
// Test Subjects
import NewGuest, {
  setCheckDate,
  areDatesValid,
  disableButton,
} from '../Guests/NewGuest';
// Jest Imports
import 'jest';
import 'jest-dom/extend-expect';

describe('Date Helper Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('setCheckDate:', () => {
    const setMockValue = jest.fn();

    test('Expect setFieldValue fn to be called with correct string argument', () => {
      // Arrange
      const testDate = new Date(Date.now());
      // Act
      const handler = setCheckDate(setMockValue, 'testCheck');
      handler(testDate);
      // Assert
      expect(setMockValue.mock.calls.length).toBe(1);
      expect(setMockValue.mock.calls[0][0]).toBe('testCheck');
    });

    test('Expect timestamp in date to be zeroed out', () => {
      // Arrange
      const dateString = '09 March 2019 13:37 UTC';
      const testDate = new Date(dateString);
      // Act
      const handler = setCheckDate(setMockValue, 'test2Check');
      handler(testDate);
      // Assert
      expect(setMockValue.mock.calls.length).toBe(1);
      const passedInDate = setMockValue.mock.calls[0][1];
      expect(passedInDate).not.toBe(testDate);
      expect(passedInDate.getTime()).toBe(testDate.setHours(0, 0, 0, 0));
    });
  });

  describe('areDatesValid:', () => {
    test('Returns correct object if dates are valid', () => {
      // Arrange
      const a = new Date(Date.now());
      const b = new Date(Date.now());
      b.setDate(a.getDate() + 2);
      // Act
      const { result, message } = areDatesValid(a, b);
      // Assert
      expect(result).toBe(true);
      expect(message).toBe('');
    });

    test('Returns appropriate message if check-in date is after check-out date', () => {
      // Arrange
      const a = new Date(Date.now());
      const b = new Date(Date.now());
      a.setDate(a.getDate() + 2);
      // Act
      const { result, message } = areDatesValid(a, b);
      // Assert
      expect(result).toBe(false);
      expect(message).toBe('Check-out date must be at or after check-in date.');
    });

    test('Returns appropriate message if check-in date is in the past', () => {
      // Arrange
      const a = new Date(Date.now());
      const b = new Date(Date.now());
      a.setDate(a.getDate() - 3);
      // Act
      const { result, message } = areDatesValid(a, b);
      // Assert
      expect(result).toBe(false);
      expect(message).toBe('Check-in date must be today or later.');
    });
  });
});

describe('UI Helper Functions', () => {
  describe('disableButton:', () => {
    /*
    This function determines whether the submit button is disabled or not.
    Therefore: true  => disabled
               false => enabled
    */
    test('Returns false if all inputs are valid', () => {
      /*
      In other words, the form is not already submitting data, the form
      has been touched and filled with data, and the dates are valid.
      */
      // Arrange
      const isSubmitting = false;
      const dirty = true;
      const dateCheckResult = {
        result: true,
        message: '',
      };
      // Act
      const result = disableButton(isSubmitting, dirty, dateCheckResult);
      // Assert
      expect(result).toBe(false);
    });

    test('Returns true if form is submitting', () => {
      // Arrange
      const isSubmitting = true;
      const dirty = true;
      const dateCheckResult = {
        result: true,
        message: '',
      };
      // Act
      const result = disableButton(isSubmitting, dirty, dateCheckResult);
      // Assert
      expect(result).toBe(true);
    });

    test('Returns true if form is untouched', () => {
      // Arrange
      const isSubmitting = true;
      const dirty = false;
      const dateCheckResult = {
        result: true,
        message: '',
      };
      // Act
      const result = disableButton(isSubmitting, dirty, dateCheckResult);
      // Assert
      expect(result).toBe(true);
    });

    test('Returns true if dates are invalid', () => {
      // Arrange
      const isSubmitting = true;
      const dirty = false;
      const dateCheckResult = {
        result: false,
        message: "Dates ain't valid",
      };
      // Act
      const result = disableButton(isSubmitting, dirty, dateCheckResult);
      // Assert
      expect(result).toBe(true);
    });
  });
});

describe('UI:', () => {
  beforeAll(() => {
    localStorage.setItem('token', 'whatever');
  });

  afterAll(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterAll(() => jest.clearAllMocks());

  test('datePicker is on the DOM', () => {
    // Arrange
    const { container, debug, getByTestId } = renderWithRouter(
      // @ts-ignore
      <NewGuest />,
      {},
    );
    // Act
    const checkIn = container.querySelector('.dp-checkIn');
    // Assert
    expect(checkIn).toBeTruthy();
  });

  test('Error div appears upon selecting invalid dates', () => {
    // Arrange
    const { container, getByTestId } = renderWithRouter(
      // @ts-ignore
      <NewGuest />,
      {},
    );
    const checkIn = container.querySelector('.dp-checkIn');
    // Act
    fireEvent.change(checkIn, { target: { value: '01/01/2001' } });
    expect(checkIn.value).toBe('01/01/2001');
    // Assert
    const errorDiv = getByTestId('date-error');
    expect(errorDiv).toBeTruthy();
    expect(errorDiv.textContent).toBe('Check-in date must be today or later.');
  });

  test('Button is disabled upon selecting invalid dates', () => {
    // Arrange
    const { container, getByTestId } = renderWithRouter(
      // @ts-ignore
      <NewGuest />,
      {},
    );
    const checkIn = container.querySelector('.dp-checkIn');
    // Act
    fireEvent.change(checkIn, { target: { value: '01/01/2001' } });
    expect(checkIn.value).toBe('01/01/2001');
    // Assert
    const submit = container.querySelector('.submit');
    expect(submit).toHaveAttribute('disabled');
  });
});
