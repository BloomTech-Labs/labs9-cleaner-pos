import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Mark from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';

import { Button } from '../index';
import {
  Container,
  NavWrapper,
  SettingsWrapper,
  StyledUL,
  StyledLink,
} from './Sidebar.styling';
import { ContentTextFormat } from 'material-ui/svg-icons';

interface LinkProps {
  onClick?: () => MouseEvent;
}

const Sidebar = (props: any) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    console.log('logout function called');
    console.log(history);
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('firebaseui::rememberedAccounts');
    props.history.push('/');
  };

  const user = useContext(UserContext);
  return (
    <Container>
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
      </div>
      <NavWrapper>
        <StyledUL>
          <li>
            <StyledLink to='/properties'>
              <h4>Properties</h4>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/guests'>
              <h4>Guests</h4>
            </StyledLink>
          </li>
          <li>
            <StyledLink to='/assistants'>
              <h4>Assistants</h4>
            </StyledLink>
          </li>
        </StyledUL>
      </NavWrapper>
      <SettingsWrapper>
        <StyledLink to='/settings'>
          <h4>Settings</h4>
        </StyledLink>

        <Button
          onClick={() => logOut()}
          className='button-sign-out'
          text='Sign Out'
        />
      </SettingsWrapper>
    </Container>
  );
};

export default withRouter(Sidebar);
