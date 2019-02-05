import React from 'react';
// Components
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
// Styled Components
import { Wrapper } from './Styles';
// Types
import { House } from '../types';
import loadingIndicator from '../../utils/loading.svg';

export const AstDropdownView = (props: {
  formState: { ast_id: number; full_name: string };
  onChangeFunc: (e: any, id: number) => void;
  house: House;
  loading: boolean;
  errors: { msg: string; error: boolean };
  className?: string;
  snackbarOpen: boolean;
  snackbarClose: (event: any, reason: string) => void;
}) => {
  const { formState, onChangeFunc, house, loading, className } = props;

  if (loading || props.house.openAst === undefined) {
    return (
      <div>
        <img src={loadingIndicator} alt='animated loading indicator' />
      </div>
    );
  }

  // Good working code
  return (
    <Wrapper className='ast-dropdown'>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.snackbarOpen}
        autoHideDuration={3000}
        onClose={props.snackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id='message-id'>Assistant successfully updated.</span>}
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            // @ts-ignore
            onClick={props.snackbarClose}
          >
            <i className='fas fa-times' />
          </IconButton>,
        ]}
      />
      <label>Reassign Assistant</label>
      <br />
      <select
        data-testid='assistant-select'
        onChange={(e) => onChangeFunc(e, house.id)}
      >
        <option defaultValue={house.default_ast_name}>
          {house.default_ast_name}
        </option>
        {house.openAst.map((ast: any) => {
          if (ast.ast_id !== house.default_ast) {
            return (
              <option key={ast.ast_id} value={ast.ast_id}>
                {ast.full_name}
              </option>
            );
          }
        })}
      </select>
    </Wrapper>
  );
};
