import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled'

const Accordion = ({ title, children, onToggle }) => {
	const [show, setShow] = useState(true);
	return (
		<div>
			<h2 onclick={() => {
				setShow(!show);
				if (onToggle) onToggle(!show);
				}}
			>
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
