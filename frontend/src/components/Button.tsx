import React from 'react';
import styled from '@emotion/styled';

// functionality is different
// text is different
// data-testid

interface ButtonProps {
  onClick?: (ev: React.FormEvent) => Promise<any> | void;
  text?: string;
  datatestid?: string;
  color?: string;
  className?: string;
  type?: string;
  disabled?: boolean;
  children?: any;
}

const Button = ({
  onClick,
  text,
  datatestid,
  color,
  className,
  disabled,
  type,
  children,
}: ButtonProps) => {
  const buttonColor = color || 'var(--color-button-background)';
  const StyledButton = styled('button')`
    /* Sizing */
    max-width: 200px;
    max-height: 64px;
    height: auto;
    padding: 0.5rem 1rem;
    border: 0;
    /* Text */
    font-weight: condensed;
    font-size: 1.25rem;
    /* Color */
    background: ${buttonColor};
    color: var(--color-button-text);
    /* Cursor */
    cursor: pointer;
  `;
  return (
    <>
      <StyledButton
        className={className}
        onClick={onClick}
        type={type || 'button'}
        data-testid={datatestid}
        disabled={disabled}
      >
        {text}
        {children}
      </StyledButton>
    </>
  );
};

export default Button;
