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

//const Billing = (props: RouteComponentProps) => {
//	handleChange(e) {
//		this.setState({
//			[name].value
//		});
//	}
//	const [ ccnum, setCCNum ] = useState(0);
	return(
		<>
		<Main>
			
			<div>
			{/*Create form for collecting billing information - CC#, Exp. CVV [submit button]*/}
			<form onSubmit={ printValues }>
				<label>
					<input name="CC Number" value={ info.ccnum } onClick= { handleSubmit }/>
					<input name="Expiration" value={ info.exp } onClick= { handleSubmit }/>
					<input name="CVV" value={ info.cvv } onClick= { handleSubmit }/>
				</label>
				<br />
				<button>Submit</button>
			</form>
			{/* Route billing information through stripe*/}
			{/* Once processed, activate subscription? create confirmation code?*/}
			</div>
		</Main>
		</>
	)
};

export default Billing;
