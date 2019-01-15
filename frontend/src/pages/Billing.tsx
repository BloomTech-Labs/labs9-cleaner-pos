import React, { FunctionComponent, useState } from "react";
import { RouteComponentProps } from 'react-router';
import Sidebar from '../components/shared_components/Sidebar';
import styled from '@emotion/styled';

const Main = styled('div')`
	margin: 50px
`

function Billing(props: RouteComponentProps) {
	
	const [info, setInfo] = useState({
		ccnum:'',
		exp: '',
		cvv: ''
	 });

{/* trying to set the type for the event handler */}
	type InputEvent = React.ChangeEvent<HTMLInputElement>;
	type FormEvent = React.FormEvent<HTMLFormElement>;

	const printValues = (e: FormEvent) => {
		e.preventDefault();
		console.log(info.ccnum, info.exp, info.cvv);

	};

	const handleChange = (e: InputEvent) => {
		setInfo ({
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
					CC Number:
					<input name="CC Number" value={ info.ccnum } onChange={ handleChange }/>
				</label>
				<label>	
					Expiration:
					<input name="Expiration" value={ info.exp } onChange={ handleChange }/>
				</label>
				<label>
					CVV:
					<input name="CVV" value={ info.cvv } onChange= { handleChange }/>
				</label>
				<br />
				<button type='button'>Submit</button>
			</form>
			{/* Route billing information through stripe*/}
			{/* Once processed, activate subscription? create confirmation code?*/}
			</div>
		</Main>
		</>
	)
};

export default Billing;
