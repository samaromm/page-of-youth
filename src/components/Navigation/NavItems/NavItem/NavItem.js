import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Li = styled.li`
  display: flex;
  height: 100%;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  text-transform: uppercase;
  align-items: center;
  border-bottom: 2px solid transparent;
  font-size: 1.2rem;
  padding: 1rem;
  margin: 0 1rem;
  font-weight: 400;
  color: var(--color-white);
  transition: all 0.2s;
  &:hover {
    border-bottom: 2px solid var(--color-white)
  }
  &.active {
    border-bottom: 1px solid var(--color-white);
  }
`;

const NavItem = ({ link, children, mobile, clicked }) => {
  return (
    <Li>
      <StyledNavLink
        onClick={clicked}
        exact
        activeClassName="active"
        mobile={mobile ? 1 : 0}
        to={link}
      >
        {children}
      </StyledNavLink>
    </Li>
  );
};

export default NavItem;