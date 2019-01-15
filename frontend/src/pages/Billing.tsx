import React, { FunctionComponent, useState } from "react";
import { RouteComponentProps } from 'react-router';
import Sidebar from '../components/shared_components/Sidebar';
import styled from '@emotion/styled';

const Main = styled('div')`
	margin: 50px
`

function Billing(props: RouteComponentProps) {
	
	const [info, setValues] = useState({
		ccnum:'',
		exp: '',
		cvv: ''
 });
	const printValues = e => {
		e.preventDefault();
		console.log(info.ccnum, info.exp, info.cvv);

	};

	const handleSubmit = e => {
		setValues ({
			...info,
			[e.target.name]: e.target.value
		});
	};

	return(
		<>
		<Main>
			<div>
			{/*Create form for collecting billing information - CC#, Exp. CVV [submit button]*/}
			<form onSubmit={ printValues }>
				<label>
					<input name="CC Number" value={ info.ccnum }/>
				</label>
				<label>	
					<input name="Expiration" value={ info.exp }/>
				</label>
				<label>
					<input name="CVV" value={ info.cvv }/>
				</label>
				<br />
				<button type='button' onClick = { handleSubmit }>Submit</button>
			</form>
			{/* Route billing information through stripe*/}
			{/* Once processed, activate subscription? create confirmation code?*/}
			</div>
		</Main>
		</>
	)
};

export default Billing;
