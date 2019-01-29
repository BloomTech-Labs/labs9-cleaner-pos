import React from 'react';
import styled from '@emotion/styled';

const StyledContainer = styled('div')`
    font-family: Roboto;
    position: relative;
    width: 70%;
    margin: 0 auto;
    display: flex;
`;

const RowContainer = ({
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

export default RowContainer;
