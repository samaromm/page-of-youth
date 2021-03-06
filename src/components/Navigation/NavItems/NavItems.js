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
        <a href="/" mobile={mobile} clicked={clicked} className={location.pathname==="/"?'forActive headerAnch':'headerAnch'}>
          Home
        </a>
        <NavItem mobile={mobile} clicked={clicked} link="/profile">
          Profile
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/logout">
          Logout
        </NavItem>
      </Ul>
    );
  } else {
    links = (
      <Ul mobile={mobile}>
        <NavItem mobile={mobile} clicked={clicked} link="/login">
          Login
        </NavItem>
        <NavItem mobile={mobile} clicked={clicked} link="/signup">
          Signup
        </NavItem>
      </Ul>
    );
  }
  return <Nav mobile={mobile}>{links}</Nav>;
};

export default NavItems;