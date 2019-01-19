import React from 'react';

interface ErrorState {
  msg: string;
  error: boolean;
}

export const axiosErrorHandler = (
  stateCb: React.Dispatch<React.SetStateAction<ErrorState>>,
) => {
  /*
  Higher order function which accepts a state updater.
  The state updater should set an object which looks like this:
  {
    msg: string,
    error: boolean,
  }
  Use this function to set an error thrown by axios into state,
  which can then be displayed on the component.
  Use it by calling the function as an argument for catch in the
  promise.
  Or use it by going `axiosErrorHandler(stateCb)(e);` in a try
  catch block.
  */
  return (e: any) => {
    if (e.response) {
      // Error response from server
      const { status, data } = e.response;
      stateCb({ msg: `${status}: ${data.message}`, error: true });
    } else if (e.request) {
      // This means that the server could not be reached
      stateCb({
        msg: 'Connection unsuccessful. Please try again.',
        error: true,
      });
    } else {
      // This means there is an error at the application level
      stateCb({
        msg: 'Request could not be processed. Please refresh the page.',
        error: true,
      });
    }
  };
};
