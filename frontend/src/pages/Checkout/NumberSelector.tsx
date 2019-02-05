import React, { useState } from 'react';
import styled from '@emotion/styled';

export const NumberSelector = ({
  value,
  disabled,
  onClick,
}: {
  value: number;
  disabled: boolean;
  onClick: (val: number) => void;
}) => {
  const handler = (newVal: number) => () => {
    onClick(newVal);
  };

  return (
    <Wrapper>
      <Button disabled={disabled} name='subtract' onClick={handler(value - 1)}>
        <i className='fas fa-minus' />
      </Button>
      <Value>{value}</Value>
      <Button disabled={disabled} name='add' onClick={handler(value + 1)}>
        <i className='fas fa-plus' />
      </Button>
    </Wrapper>
  );
};

/* Styles */
const Wrapper = styled.div`
  /* Box Model */
  height: 1.75rem;
  /* Flex */
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  /* Conditional Display */
  visibility: ${({ disabled }) => (disabled ? 'hidden' : 'visible')};
  /* Box Model */
  height: 100%;
  width: 1.875rem;
  border: none;
  /* Hover Effects */
  transition: all 0.1s ease-in-out;
  &:hover {
    /* TODO: Use a color variable for this */
    border: 1px solid rgba(69, 147, 182, 0.25);
  }
  /* Colors */
  color: var(--color-button-text-alt);
  background-color: var(--color-button-background-alt);
  /* Text */
  font-size: 0.75rem;
  /* Cursor */
  /* TODO: Remove this property and have this style extend
     Button */
  cursor: pointer;
`;

const Value = styled.div`
  /* Box Model */
  height: 100%;
  padding: 0 1rem;
  /* Flex */
  display: flex;
  align-items: center;
  /* Colors */
  color: var(--color-button-text-alt);
  background-color: white;
  /* Text */
  font-size: 1.25rem;
`;
