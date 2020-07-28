import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem/NavItem';

const Nav = styled.nav`
  display: flex;
  margin-top: ${props => (props.mobile ? '-6rem' : null)};
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
  align-items: center;
  height: 100%;
`;

const NavItems = ({ mobile, clicked, loggedIn }) => {
  let links;
  let location = useLocation();
  if (loggedIn.uid) {
    links = (
      <Ul mobile={mobile}>
        <a href="/" mobile={mobile} clicked={clicked} className={location.pathname=="/"?'forActive headerAnch':'headerAnch'}>
          Home
        </a>
        <a mobile={mobile} clicked={clicked} href="/profile" className={location.pathname=="/profile"?'forActive headerAnch':'headerAnch'}>
          Profile
        </a>
        <a mobile={mobile} clicked={clicked} href="/logout" className={location.pathname=="/logout"?'forActive headerAnch':'headerAnch'}>
          Logout
        </a>
      </Ul>
    );
  } else {
    links = (
      <Ul mobile={mobile}>
        <a mobile={mobile} clicked={clicked} href="/login" className={location.pathname=="/login"?'forActive headerAnch':'headerAnch'}>
          Login
        </a>
        <a mobile={mobile} clicked={clicked} href="/signup" className={location.pathname=="/signup"?'forActive headerAnch':'headerAnch'}>
          Signup
        </a>
      </Ul>
    );
  }
  return <Nav mobile={mobile}>{links}</Nav>;
};

export default NavItems;