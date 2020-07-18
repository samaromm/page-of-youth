import React from 'react';
import styled from 'styled-components';

import Logo from '../../Logo/Logo';
import {Container} from '../../../layout/elements';
import NavItems from '../NavItems/NavItems';

const FixedWrapper = styled.header`
  position: fixed;
  background-color: #F43F54;
  padding: 0rem 2rem;
  top: 0;
  left: 0;
  width: 100%;
  z-index:10;
  height: 6rem;
  @media ${props => props.theme.mediaQueries.smallest} {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;

const Navbar = ({ loggedIn }) => {
    return (
    <FixedWrapper>
        <Container>
            <Wrapper>
                <Logo />
                <NavItems loggedIn={loggedIn} />
            </Wrapper>
        </Container>
    </FixedWrapper>
);
};
export default Navbar;