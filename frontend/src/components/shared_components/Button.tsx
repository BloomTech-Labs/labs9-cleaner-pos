import React from 'react';
import styled from '@emotion/styled';

// functionality is different
// text is different
// data-testid

const StyledButton = styled('button')`
  background: #393534;
  width: 200px;
  height: 50px;
  color: #e4e4e4;
  border: 0;
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
