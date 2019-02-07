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
  classNameS?: string;
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
  classNameS,
  disabled,
  type,
  children,
}: ButtonProps) => {
  const buttonColor = color || 'var(--color-button-background)';
  const StyledButton = styled('button')`
    opacity: 1;
    /* Sizing */
    max-width: 200px;
    width: 200px;
    max-height: 64px;
    height: auto;
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: var(--border-radius);
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

  const RetButton = () => (
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
  );

  return type === 'submit' ? (
    <>
      <Tooltip title={disabled ? 'Please add missing options' : ''}>
        <span className={classNameS}>
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
  ) : (
    <RetButton />
  );
};

export default Button;
