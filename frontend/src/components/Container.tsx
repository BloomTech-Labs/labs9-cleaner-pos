import React from 'react';
import styled from '@emotion/styled';

const StyledContainer = styled('div')`
  font-family: Roboto;
  position: relative;
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width 700px) {
	width: 70%;
  }
`;

const Container = ({
  className,
  children,
}: {
  className?: any;
  children?: any;
}) => {
  return (
    <>
      <StyledContainer className={className}>{children}</StyledContainer>
    </>
  );
};

export default Container;
