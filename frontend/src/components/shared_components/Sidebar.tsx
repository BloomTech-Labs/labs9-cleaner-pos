import React from 'react';
import { Link } from 'react-router-dom';
//import './index.css';
import Button from './Button'

//each menu item is a button
//each button will redirect the page to a different link

const Sidebar = (props) => {
	return(
   		<nav>
    		<div>
     			<Link to = '/guests'>
					<Button>Guests</Button>
				</Link>
			</div>
    		<div>
				<Link to = '/checkout'>
      				<Button>Checkout</Button>
    			</Link>
			</div>
    		<br />
			<div>
	  			<Button>------</Button>
			</div>
    		<div>
				<Link to = '/houses'>
      				<Button>Houses</Button>
				</Link>
    		</div>
    		<div>
				<Link to = '/assistants'>
      				<Button>Assistants</Button>
				</Link>
    		</div>
    		<div>
				<Link to = '/reports'>
      				<Button>Reports</Button>
    			</Link>
			</div>
    		<div>
				<Link to = '/settings'>
      				<Button>Settings</Button>
    			</Link>
			</div>
    		<div>
				<Link to = '/billing'>
      				<Button>Billing</Button>
				</Link>
    		</div>

   		</nav>
	)
}

export default Sidebar;
