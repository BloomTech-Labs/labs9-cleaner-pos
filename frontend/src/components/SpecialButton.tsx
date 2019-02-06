import React from 'react';
import styled from '@emotion/styled';

// functionality is different
// text is different
// data-testid

interface SpecialButtonProps {
  onClick?: (ev: React.FormEvent) => Promise<any> | void;
  text?: string;
  datatestid?: string;
  color?: string;
  className?: string;
  type?: string;
  disabled?: boolean;
}

const SpecialButton = ({
  onClick,
  text,
  datatestid,
  color,
  className,
  disabled,
}: SpecialButtonProps) => {
  const buttonColor = color;
  const StyledButton = styled('button')`
    width: 40px;
    height: 40px;

    @media only screen and (min-width: 700px) {
      border: var(--border);
      width: 125px;
      height: 40px;
      color: ${buttonColor || '#000000'};
      background-color: #ffffff;
      font-size: 1.35rem;
    }
  `;
  return (
    <>
      <StyledButton
        onClick={onClick}
        type='button'
        data-testid={datatestid}
        className={className}
        disabled={disabled}
      >
        {text}
      </StyledButton>
    </>
  );
};

export default SpecialButton;
