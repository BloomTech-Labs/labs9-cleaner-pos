import React from 'react';
import { cleanup, wait } from 'react-testing-library';
import { renderWithRouter } from '../../helpers/functions';
import NewGuest, {
  setCheckDate,
  areDatesValid,
  disableButton,
} from '../Guests/NewGuest';
import 'jest';

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

    test('Returns true if form is untouched', () => {
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
