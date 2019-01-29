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
    border: 1px solid black;
    /* border-radius: 10px; */
    width: 150px;
    height: 50px;
    color: black;
    background-color: white;
    font-size: 1.25rem;
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
