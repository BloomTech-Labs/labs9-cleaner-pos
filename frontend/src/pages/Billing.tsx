import React, { useState } from "react";
import { RouteComponentProps } from 'react-router';
import Sidebar from '../components/shared_components/Sidebar';
import styled from '@emotion/styled';

const Main = styled.div`
	margin: 50px
`

const Billing = (props: RouteComponentProps) => {
//	handleChange(e) {
//		this.setState({
//			[name].value
//		});
//	}

	const [ ccnum, setCCNum ] = useState("");
	return(
		<>
		<div>
			<Sidebar />
		</div>
		<Main>
			
			<div>
			{/*Create form for collecting billing information - CC#, Exp. CVV [submit button]*/}
			<form>
				<label>
					<input name="CC Number" type="string" onClick={() => {
						const NewCCN = prompt("Enter your CC number");
						setCCNum(NewCCN);
					}}
					/>
					<input name="Expiration" type="number"/>
					<input name="CVV" type="number"/>
				</label>
			</form>
			{/* Route billing information through stripe*/}
			{/* Once processed, activate subscription? create confirmation code?*/}
			</div>
		</Main>
		</>
	)
};

export default Billing;
