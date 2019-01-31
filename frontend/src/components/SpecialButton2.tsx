import React from 'react';
import styled from '@emotion/styled';

// functionality is different
// text is different
// data-testid

interface SpecialButton2Props {
  onClick?: (ev: React.FormEvent) => Promise<any> | void;
  text?: string;
  datatestid?: string;
  color?: string;
  className?: string;
  type?: string;
  disabled?: boolean;
}

const SpecialButton2 = ({
  onClick,
  text,
  datatestid,
  color,
  className,
  disabled,
}: SpecialButton2Props) => {
  const buttonColor = color;
  const StyledButton2 = styled('button')`
    width: 50px;
    height: 50px;
    border: none;
    background-color: #eeeff5;
  `;
  return (
    <>
      <StyledButton2
        onClick={onClick}
        type='button'
        data-testid={datatestid}
        className={className}
        disabled={disabled}
      >
        {text}
      </StyledButton2>
    </>
  );
};

export default SpecialButton2;
