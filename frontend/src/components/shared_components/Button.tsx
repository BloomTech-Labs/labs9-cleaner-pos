import React from "react";

const Button = (props) => {
    return (
        <button onClick={ props.onClick }className={ `${ props.style }` }>
            {props.action}
        </button>
    );
};

Button.defaultProps = {action: '&'};

export default Button; 

