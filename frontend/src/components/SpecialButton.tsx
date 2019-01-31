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
    width: 50px;
    height: 50px;
		border: none;
		background-color: #eeeff5
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
