import React from 'react';
import { Link } from 'react-router-dom';
//import './index.css';

interface LinkProps {
	onClick?: () => React.MouseEvent;
}

const Sidebar = ({ onClick }: LinkProps) => {
	return(
   		<nav>
    		<div>
     			<Link to = '/guests'>
					<h3>Guests</h3>
				</Link>
			</div>
    		<div>
				<Link to = '/checkout'>
      				<h3>Checkout</h3>
    			</Link>
			</div>
    		<div>
				<h3>------</h3>
			</div>
			<div>
				<Link to = '/houses'>
      				<h3>Houses</h3>
				</Link>
    		</div>
    		<div>
				<Link to = '/assistants'>
      				<h3>Assistants</h3>
				</Link>
    		</div>
    		<div>
				<Link to = '/reports'>
      				<h3>Reports</h3>
    			</Link>
			</div>
    		<div>
				<Link to = '/settings'>
      				<h3>Settings</h3>
    			</Link>
			</div>
    		<div>
				<Link to = '/billing'>
      				<h3>Billing</h3>
				</Link>
    		</div>

   		</nav>
	)
};

export default Sidebar;
