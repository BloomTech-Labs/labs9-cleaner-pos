import React from 'react';
// Components
import Snackbar from '../../../components/Snackbar';

// Styled Components
import { Wrapper } from './Styles';
// Types
import { House } from '../types';
import loadingIndicator from '../../utils/loading.svg';

export const AstDropdownView = (props: {
  onChangeFunc: (e: any, id: number) => void;
  house: House;
  loading: boolean;
  errors: { msg: string; error: boolean };
  className?: string;
  snackbarOpen: boolean;
  snackbarClose: (event: any, reason: string) => void;
}) => {
  const { onChangeFunc, house, loading, className } = props;

  if (loading || props.house.openAst === undefined) {
    return (
      <div>
        <img src={loadingIndicator} alt='animated loading indicator' />
      </div>
    );
  }

  // Good working code
  return (
    <>
      <Snackbar
        snackbarOpen={props.snackbarOpen}
        snackbarClose={props.snackbarClose}
        message='Assistant successfully updated.'
      />
      <Wrapper
        className='ast-dropdown'
        label='Reassign Assistant'
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
      </Wrapper>
    </>
  );

  // Previous Working
  // return (
  //   <Wrapper className='ast-dropdown'>
  //     <Snackbar
  //       snackbarOpen={props.snackbarOpen}
  //       snackbarClose={props.snackbarClose}
  //       message='Assistant successfully updated.'
  //     />
  //     <label>Reassign Assistant</label>
  //     <br />
  //     <select
  //       data-testid='assistant-select'
  //       onChange={(e) => onChangeFunc(e, house.id)}
  //     >
  //       <option defaultValue={house.default_ast_name}>
  //         {house.default_ast_name}
  //       </option>
  //       {house.openAst.map((ast: any) => {
  //         if (ast.ast_id !== house.default_ast) {
  //           return (
  //             <option key={ast.ast_id} value={ast.ast_id}>
  //               {ast.full_name}
  //             </option>
  //           );
  //         }
  //       })}
  //     </select>
  //   </Wrapper>
  // );
};
