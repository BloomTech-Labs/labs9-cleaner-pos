import React from 'react';
// Styles
import styled from '@emotion/styled';

export const InfoBox = (props: {
  main: string;
  secondary: string;
  className?: string;
}) => {
  const InfoDiv = styled.div`
    /* Sizing & Box Model */
    border: 1px solid var(--colour-border);

    /* Flexbox */
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;

    /* Color */
    background-color: var(--colour-accent-background);

    div[class^='text-'] {
      display: block;
    }

    .text-main {
      font-family: 'Roboto Medium', Arial, sans-serif;
      font-size: ${36 / 16}rem;
      color: var(--colour-accent);
    }

    .text-secondary {
      font-family: 'Roboto Light', Arial, sans-serif;
      font-size: ${20 / 16}rem;
      color: var(--colour-main-black);
    }
  `;

  const { main, secondary, className } = props;
  return (
    <InfoDiv className={className}>
      <div className='text-main'>{main}</div>
      <div className='text-secondary'>{secondary}</div>
    </InfoDiv>
  );
};
