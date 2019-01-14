import React from "react";
import { RouteComponentProps } from 'react-router';
import Sidebar from '../components/shared_components/Sidebar';
import styled from '@emotion/styled';

const Billing = (props: RouteComponentProps) => {
	return(
		<>
		<div>
			<Sidebar />
		</div>
		<div>
			<p>Billing stuff</p>
		</div>
		</>
	)
};

export default Billing;
