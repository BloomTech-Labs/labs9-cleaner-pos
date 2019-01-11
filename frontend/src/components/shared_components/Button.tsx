import React from 'react';
import styled from '@emotion/styled';
import { string } from 'prop-types';

// functionality is different
// text is different
// data-testid

const StyledButton = styled('button')`
  border-radius: 5px;
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
