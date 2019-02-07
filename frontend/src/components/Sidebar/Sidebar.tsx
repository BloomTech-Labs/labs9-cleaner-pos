import React, { useState, useContext } from 'react';
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
import logo from '../../assets/lodgel.jpg';
import { UserContext } from '../../App';

interface LinkProps extends RouteComponentProps {
  onClick?: () => MouseEvent;
}

const Sidebar = (props: LinkProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setLogin } = useContext(UserContext);

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
    setLogin(false);
    // TODO: Use actual firebase signout function to sign out
    props.history.push('/');
  };

  return (
    <div
      style={{
        maxWidth: '9000px',
        width: '100%',
        borderBottom: '3px solid var(--color-border-strong)',
        background: 'white',
      }}
    >
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
            <Link to='/properties'>
              <MenuItem onClick={handleClose}>Properties</MenuItem>
            </Link>
            <Link to='/guests'>
              <MenuItem onClick={handleClose}>Guests</MenuItem>
            </Link>
            <Link to='/assistants'>
              <MenuItem onClick={handleClose}>Assistants</MenuItem>
            </Link>
            <Link to='/billing'>
              <MenuItem onClick={handleClose}>Subscribe</MenuItem>
            </Link>
          </Menu>
          <SettingsWrapper>
            <StyledLink to='/settings'>
              <i className='fas fa-cog' />
            </StyledLink>
            <SpecialButton
              onClick={() => logOut()}
              className='fas fa-sign-out-alt signout'
            />
          </SettingsWrapper>
        </div>
        <NavBar {...props}>
          <NavWrapper>
            <StyledUL>
              {/* Uncomment this section when reports page is complete */}
              {/* <div>
              <StyledLink to='/reports'>
                <h4>Reports</h4>
              </StyledLink>
            </div> */}
              <div>
                <StyledLink to='/' className='header-bar--logo'>
                  <img
                    style={{ height: '100px', width: '100px' }}
                    src={logo}
                    alt='Lodgel logo'
                  />
                </StyledLink>
              </div>
              <div>
                <StyledLink to='/properties'>
                  <h4
                    style={{
                      borderBottom: props.location.pathname.match(
                        '/properties/*.*?',
                      )
                        ? '2px solid var(--color-accent-alt)'
                        : '0',
                    }}
                  >
                    Properties
                  </h4>
                </StyledLink>
              </div>
              <div>
                <StyledLink to='/guests'>
                  <h4
                    style={{
                      borderBottom: props.location.pathname.match(
                        '/guests/*.*?',
                      )
                        ? '2px solid var(--color-accent-alt)'
                        : '0',
                    }}
                  >
                    Guests
                  </h4>
                </StyledLink>
              </div>
              <div>
                <StyledLink to='/assistants'>
                  <h4
                    style={{
                      borderBottom: props.location.pathname.match(
                        '/assistants/*.*?',
                      )
                        ? '2px solid var(--color-accent-alt)'
                        : '0',
                    }}
                  >
                    Assistants
                  </h4>
                </StyledLink>
              </div>
            </StyledUL>
          </NavWrapper>
          <SettingsWrapper>
            <Link to='/billing'>
              <Button
                text='Subscribe'
                className='header-bar--subscribe-button'
              />
            </Link>
            <StyledLink to='/settings'>
              <i className='fas fa-cog' />
            </StyledLink>
            <SpecialButton
              type='button'
              onClick={() => logOut()}
              className='fas fa-sign-out-alt fa-lg signout'
            />
          </SettingsWrapper>
        </NavBar>
      </Container>
    </div>
  );
};

export default withRouter(Sidebar);
