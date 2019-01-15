import React from 'react';
import styled from '@emotion/styled';

const StyledContainer = styled('div')`
  font-family: roboto;
  position: relative;
  width: 70%;
  margin: 0 auto;
  padding-top: 48px;
  span {
    font-size: 36px;
    position: absolute;
    top: 0;
    left: 0;
    text-align: left;
    border-bottom: 1px solid #b8003f;
  }
`;

const Container = ({ children }: { children: any }) => {
  return (
    <>
      <StyledContainer>{children}</StyledContainer>
    </>
  );
};

export default Container;
