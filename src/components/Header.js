import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../images/logo.png';

const Header = () => (
  <StyledHeader>
    <Link to="/">
      <Img src={Logo} alt="Logo" />
    </Link>
    <ul>
      <Link to="/products">
        <li>상품</li>
      </Link>
      <Link to="/cart">
        <li>장바구니</li>
      </Link>
    </ul>
  </StyledHeader>
);

const StyledHeader = styled.div`
  max-width: 1176px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  padding: 9px 0;
  a {
    text-decoration: none;
    color: black;
    text-align: center;
  }
  ul {
    display: flex;
    padding-left: 0;
    li {
      margin: 0 10px;
      list-style-type: none;
      font-size: 14px;
    }
  }
`;

const Img = styled.img`
  display: flex;
  cursor: pointer;
  width: 109px;
  height: 30px;
  padding: 1px 2px;
`;

export default Header;
