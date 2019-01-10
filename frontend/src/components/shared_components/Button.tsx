import React from "react";
import styled from '@emotion/styled'
import { string } from 'prop-types';

const StyledButton = styled('button')`
	color: yellow;
`

interface ButtonProps {
	onClick?: () => React.MouseEvent;
	text?: string;
	datatestid?: string;
}

const Button = ({ onClick, text, datatestid }: ButtonProps) => {
    return (
		<>
        	<StyledButton onClick={ onClick } type='button' data-testid={ datatestid}>
            	{ text }
        	</StyledButton>
    );
};

export default Button; 
