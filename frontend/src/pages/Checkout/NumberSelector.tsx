import React, { useState } from 'react';
import styled from '@emotion/styled';

export const NumberSelector = ({
  value,
  onClick,
  min,
}: {
  value: number;
  onClick: (val: number) => void;
  min?: number;
}) => {
  const handler = (newVal: number) => () => {
    onClick(newVal);
  };

  return (
    <Wrapper>
      <Button name='subtract' onClick={handler(value - 1)}>
        <i className='fas fa-minus' />
      </Button>
      <Value>{value}</Value>
      <Button name='add' onClick={handler(value + 1)}>
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
  /* Box Model */
  height: 100%;
  width: 1.875rem;
  border: none;
  /* Colors */
  color: var(--color-button-text);
  background-color: var(--color-button-background);
  /* Text */
  font-size: 0.75rem;
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
