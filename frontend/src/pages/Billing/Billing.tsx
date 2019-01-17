import React from 'react';
import Stripe from './index';
import { Container } from '../../components/index';
import styled from '@emotion/styled';

{/* const Title = styled.h2`
	background-color: aqua;
	color: black;
	padding: 15px;
	margin-bottom: 0;
`;

const Content = styled.div`
	opacity: ${ props => (props.open ? '1' : '0') };
	max-height: ${ props => (props.open ? '100%' : '0') };
	overflow: hidden;
	padding: ${ props =P (props.open ? '15px' : '0 15px') };
	transition: all 0.3s;
`;

class Billing extends React.Component {
	constructor() {
		super();
		this.state = { open: false };
	}

toggleOpen() {
	this.setState(prevState => ({ open: !prevState.open }));
}
*/}
const Billing = () => {


// render() {
  return (
    <Container>
{/*		<div>
			<Title onClick = { this.toggleOpen }> First Thing </Title>
			<Content open= { this.state.open }>
				<p>Open Sesame!</p>
			</Content>
		</div>
   */}     <Stripe />
    </Container>
  );
};
export default Billing;

