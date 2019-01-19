import React from 'react';
// Styles
import styled from '@emotion/styled';

export const InfoBox = (props: {
  main: string;
  secondary: string;
  className?: string;
}) => {
  const InfoDiv = styled.div`
    border: 1px solid rgba(22, 21, 20, 0.12);
    background-color: white;

    .main-text {
      font-family: 'Roboto Medium', Arial, sans-serif;
      font-size: ${36 / 16}rem;
    }

    .secondary-text {
      font-family: 'Roboto Light', Arial, sans-serif;
      font-size: ${20 / 16}rem;
    }
  `;

  const { main, secondary, className } = props;
  return (
    <InfoDiv className={className}>
      <div className='main-text'>{main}</div>
      <div className='secondary-text'>{secondary}</div>
    </InfoDiv>
  );
};
