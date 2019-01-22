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
<<<<<<< HEAD

=======
>>>>>>> 79c993865d8c6f419405edf50b70002d1bc79c88
