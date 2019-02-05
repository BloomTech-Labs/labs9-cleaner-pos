import React from 'react';
// Components
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const ExportedSnackBar = ({
  snackbarOpen,
  snackbarClose,
  message,
}: {
  snackbarOpen: boolean;
  snackbarClose: (event: any, reason: string) => void;
  message: string;
}) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={snackbarOpen}
    autoHideDuration={3000}
    onClose={snackbarClose}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id='message-id'>{message}</span>}
    action={[
      <IconButton
        key='close'
        aria-label='Close'
        color='inherit'
        // @ts-ignore
        onClick={snackbarClose}
      >
        <i className='fas fa-times' />
      </IconButton>,
    ]}
  />
);

export default ExportedSnackBar;
