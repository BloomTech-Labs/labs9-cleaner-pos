import React from 'react';
import { Link } from 'react-router-dom';
//import './index.css';
import Button from './Button'

const Sidebar ] (props) => {
	return(
   		<nav>
    		<>
     			<Button>Guests<Button>
			</>
    		<>
      			<Button>Checkout</Button>
    		</>
    		<br />
			<>
	  			<Button>------</Button>
			</>
    		<>
      			<Button>Houses</Button>
    		</>
    		<>
      			<Button>Assistants</Button>
    		</>
    		<>
      			<Button>Reports</Button>
    		</>
    		<>
      			<Button>Settings</Button>
    		</>
    		<>
      			<Button>Billing</Button>
    		</>

   		</nav>
	)
}

export default Sidebar;
