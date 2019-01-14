import React from 'react';
import styled from '@emotion/styled';
import { string } from 'prop-types';

// functionality is different
// text is different
// data-testid

const StyledButton = styled('button')`
  padding: 10px 30px;
  background-color: #36302E;
  color: white;
  font-family: 'Roboto';
  font-size: 1.4rem;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
`;

interface ButtonProps {
  onClick?: () => void;
  text?: string;
  datatestid?: string;
}

const Button = ({ onClick, text, datatestid }: ButtonProps) => {
  return (
    <>
      <StyledButton onClick={onClick} type='button' data-testid={datatestid}>
        {text}
      </StyledButton>
    </>
  );
};

export default Button;
