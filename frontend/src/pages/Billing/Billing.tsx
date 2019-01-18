import React, { useState } from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import Open from './Open';

const Billing = () => {
	return(
	    <Container>
			<div>
				<Open
					title= {`first title`}
					content= {`first content`}
				/>	
			</div>
    	</Container>
  );
};
	
export default Billing;

