import React from 'react';
import styled from '@emotion/styled';

const pxToRem = (px: number) => px / 16;

const StyledContainer = styled('div')`
  max-width: 1000px;
  font-family: Roboto;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: ${pxToRem(36)}rem auto;
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
      <StyledContainer data-testid='container-component' className={className}>
        {children}
      </StyledContainer>
    </>
  );
};

export default Container;
