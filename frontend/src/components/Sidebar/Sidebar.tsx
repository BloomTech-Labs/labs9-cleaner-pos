import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Mark from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
// Types
import { RouteComponentProps } from 'react-router-dom';

import { Button, SpecialButton } from '../index';
import {
  Container,
  NavBar,
  NavWrapper,
  SettingsWrapper,
  StyledUL,
  StyledLink,
} from './Sidebar.styling';
import { ContentTextFormat } from 'material-ui/svg-icons';

interface LinkProps extends RouteComponentProps {
  onClick?: () => MouseEvent;
}

const Sidebar = (props: LinkProps) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('firebaseui::rememberedAccounts');
    props.history.push('/');
  };

  const user = useContext(UserContext);

  return (
    <Container {...props}>
      <div className='menu'>
        <Mark
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleClick}
        >
          Menu
        </Mark>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to='/property'>Property</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to='/guests'>Guests</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to='/assistants'>Assistants</Link>
          </MenuItem>
        </Menu>
        <SettingsWrapper>
          <StyledLink to='/settings'>
            <i className='fas fa-cog'></i>
          </StyledLink>
          <SpecialButton
            onClick={() => logOut()}
            className='fas fa-sign-out-alt'
          />
        </SettingsWrapper>
      </div>
      <NavBar>
        <NavWrapper>
          <StyledUL>
            {/* Uncomment this section when reports page is complete */}
            {/* <div>
              <StyledLink to='/reports'>
                <h4>Reports</h4>
              </StyledLink>
            </div> */}
            <div>
              <StyledLink to='/properties'>
                <h4>Properties</h4>
              </StyledLink>
            </div>
            <div>
              <StyledLink to='/guests'>
                <h4>Guests</h4>
              </StyledLink>
            </div>
            <div>
              <StyledLink to='/assistants'>
                <h4>Assistants</h4>
              </StyledLink>
            </div>
          </StyledUL>
        </NavWrapper>
        <SettingsWrapper>
          <StyledLink to='/settings'>
            <i className='fas fa-cog'></i>
          </StyledLink>

          <SpecialButton
            onClick={() => logOut()}
            className='button-sign-out'
            text='Sign Out'
          />
        </SettingsWrapper>
      </NavBar>
    </Container>
  );
};

export default withRouter(Sidebar);
