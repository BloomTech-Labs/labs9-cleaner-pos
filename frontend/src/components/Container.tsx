import React from 'react';
import styled from '@emotion/styled';

const StyledContainer = styled('div')`
  font-family: Roboto;
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
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
