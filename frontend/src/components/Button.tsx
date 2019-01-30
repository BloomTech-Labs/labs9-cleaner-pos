import React from 'react';
import styled from '@emotion/styled';

// functionality is different
// text is different
// data-testid

interface ButtonProps {
  onClick?: (ev: React.FormEvent) => Promise<any> | void;
  text?: string;
  datatestid?: string;
  colour?: string;
  className?: string;
  type?: string;
  disabled?: boolean;
}

const Button = ({
  onClick,
  text,
  datatestid,
  colour,
  className,
  disabled,
}: ButtonProps) => {
  const buttonColour = colour || 'var(--colour-button-background)';
  const StyledButton = styled('button')`
    background: ${buttonColour};
    max-width: 200px;
    max-height: 64px;
    width: 100%;
    height: auto;
    padding: 0.5rem;
    color: var(--colour-button-text);
    border: 0;
    font-weight: condensed;
    font-size: 1.25rem;
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
        disabled={disabled}
      >
        {text}
      </StyledButton>
    </>
  );
};

export default Button;
