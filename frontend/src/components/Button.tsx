import React from 'react';
import styled from '@emotion/styled';

// functionality is different
// text is different
// data-testid

interface ButtonProps {
  onClick?: (ev: any) => Promise<any> | void;
  text?: string;
  datatestid?: string;
  colour?: string;
  className?: string;
}

const Button = ({
  onClick,
  text,
  datatestid,
  colour,
  className,
}: ButtonProps) => {
  const buttonColour = colour || 'var(--colour-main-black)';
  const StyledButton = styled('button')`
    background: ${buttonColour};
    width: 200px;
    height: 50px;
    color: #e4e4e4;
    border: 0;
    font-weight: condensed;
    font-size: 24px;
    /* box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  `;
  return (
    <>
      <StyledButton
        className={className}
        onClick={onClick}
        type='button'
        data-testid={datatestid}
      >
        {text}
      </StyledButton>
    </>
  );
};

export default Button;
