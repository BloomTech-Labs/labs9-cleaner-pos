import React from 'react';
import styled from '@emotion/styled';
import Tooltip from '@material-ui/core/Tooltip';

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
    width: 200px;
    max-height: 64px;
    height: auto;
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: 0.25rem;
    /* Text */
    font-weight: normal;
    font-size: 1rem;
    /* Color */
    background: ${!disabled ? buttonColor : '#66615e'};
    color: var(--color-button-text);
    /* Cursor */
    cursor: ${!disabled ? 'pointer' : 'initial'};
    i {
      color: var(--color-button-text);
    }
  `;
  return (
    <>
      <Tooltip title={disabled ? 'Please add missing options' : ''}>
        <span>
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
        </span>
      </Tooltip>
    </>
  );
};

export default Button;
