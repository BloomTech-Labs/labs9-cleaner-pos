import React from 'react';
import { Link } from 'react-router-dom';
//import './index.css';
import Button from './Button'

//each menu item is a button
//each button will redirect the page to a different link

const Sidebar = (props) => {
	return(
   		<nav>
    		<>
     			<Link to = '/guests'>
					<Button>Guests</Button>
				</Link>
			</>
    		<>
				<Link to = '/checkout'>
      				<Button>Checkout</Button>
    			</Link>
			</>
    		<br />
			<>
	  			<Button>------</Button>
			</>
    		<>
				<Link to = '/houses'>
      				<Button>Houses</Button>
				</Link>
    		</>
    		<>
				<Link to = '/assistants'>
      				<Button>Assistants</Button>
				</Link>
    		</>
    		<>
				<Link to = '/reports'>
      				<Button>Reports</Button>
    			</Link>
			</>
    		<>
				<Link to = '/settings'>
      				<Button>Settings</Button>
    			</Link>
			</>
    		<>
				<Link to = '/billing'>
      				<Button>Billing</Button>
				</Link>
    		</>

   		</nav>
	)
}

export default Sidebar;
