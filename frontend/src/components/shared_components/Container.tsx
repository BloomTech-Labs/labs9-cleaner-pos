import React from 'react';
import styled from '@emotion/styled';

const StyledContainer = styled('div')`
  font-family: Roboto;
  position: relative;
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const Container = ({ children }: { children?: any }) => {
  return (
    <>
      <StyledContainer>{children}</StyledContainer>
    </>
  );
};

export default Container;
