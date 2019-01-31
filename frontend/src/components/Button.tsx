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
}

const Button = ({
  onClick,
  text,
  datatestid,
  color,
  className,
  disabled,
  type,
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
    /* box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19); */
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
      </StyledButton>
    </>
  );
};

export default Button;
