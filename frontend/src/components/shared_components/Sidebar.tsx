import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';
import styled from '@emotion/styled';
import WebFont from 'webfontloader';

WebFont.load({
	google: {
		families: ['Roboto: 300, 400, 700', 'sans-serif']
	}
});

const StyledUL = styled('ul')`
  list-style-type: none;
`;

const StyledLink = styled(NavLink)`
  float: left;
  padding: 10px;
  text-decoration: none;
  color: black;
`;

interface LinkProps {
  onClick?: () => MouseEvent;
}

const Sidebar = ({ onClick }: LinkProps) => {
  return (
    <nav>
      <div>
        <StyledUL>
          <li>
            <StyledLink to='/reports'>
              <h3>Reports</h3>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/Properties'>
              <h3>Properties</h3>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/Assistants'>
              <h3>Assistants</h3>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/settings'>
              <h3>Settings</h3>
            </StyledLink>
          </li>
		  <li>
			<StyledLink to='/logout'>
			{/* <Button onClick={} t='button' data-testid='signout'>Sign Out</Button> */}
			<button>Sign Out</button>
			</StyledLink>			
          </li>
        </StyledUL>
      </div>
    </nav>
  );
};

export default Sidebar;
