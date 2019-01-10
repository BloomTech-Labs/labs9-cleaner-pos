import React from "react";
import styled from '@emotion/styled'


const Button = styled.button`
	color: yellow;
`

render() {
	const {
		action: something //not sure what to do here as there are probably going to be a gazillion buttons that each do different things
	} = this.props;
 
    return (
        <button onClick={ this.onClick }>
            { action }
        </button>
    );
};

export default Button; 

