import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled'

interface MySettings {
	title?: string;
	content?: any;
	onToggle?: ()=> void;
	onClick?: () => void;
}

const Accordion = ({ title, content, onToggle }: MySettings) => {
	const [show, setShow] = useState(true);
	return (
		<div>
			<h2 onClick={() => {
				setShow(!show);
				if (onToggle) onToggle(!show)
			}}>
				{title}
			</h2>
			{show ? <Fragment>{content}</Fragment> : null}
		</div>
	);
};

Accordion.propTypes = {
	content: PropTypes.any.isRequired,
	onToggle: PropTypes.func,
	title: PropTypes.string.isRequired
};

export default Accordion;
