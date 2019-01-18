import React, { useState } from 'react';
import styled from '@emotion/styled';

interface MyConfig {
	onClick?: () => void;
	title?: string;
	content?: string;
}

function Open ({ onClick, title, content }: MyConfig) {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen: !useState;
	}
	

	return (
		<div>
			<button onClick={handleClick} type='button'>{ title }</button>
			{ open ?
				null
				: <div><p>{ content }</p></div>
			}
		</div>
	)
}

export default Open;
