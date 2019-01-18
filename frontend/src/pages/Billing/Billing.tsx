import React, { useState } from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import styled from '@emotion/styled';

interface MyConfig {
	onClick?: () => void;
	title?: string;
	content?: string;
}


const Open = ({ onClick, title, content }: MyConfig) => {
	const [open, setOpen] = useState(false);

	return(
		<div>
		{open ? (
			<button onClick={() => setOpen(true)}> {title}{content}</button>
			) : (
			<button onClick={() => setOpen(false)}> {title}</button>
			)
		}
		</div>
	)
}
const Billing = () => {

	return(
	    <Container>
			<div>
				<Open 
					title={`first title`}
					content={`first content`}
				/>
			</div>
    	</Container>
  );
};
	
export default Billing;

