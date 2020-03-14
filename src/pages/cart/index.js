import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../App';
import { getDataApi } from '../../api';
import styled from 'styled-components';
import CartItem from '../../components/CartItem';
import TotalPrice from '../../components/TotalPrice';
import colors from '../../styles/colors';

const Cart = () => {
  const [coupons, setCoupons] = useState([]);
  const { cartList } = useContext(CartContext);
  const emptyCartList = cartList.length === 0;

  useEffect(() => {
    getDataApi('coupons').then(coupons => {
      setCoupons(coupons);
    });
  }, []);

  return (
    <StyledCart>
      <Title>찜한 클래스</Title>
      <CartItemsWrapper isHave={!emptyCartList}>
        {!emptyCartList || <Link to="/products">Class를 찜해주세요 :)</Link>}
        {cartList.map(item => (
          <CartItem key={item.product.id} item={item} coupons={coupons} />
        ))}
      </CartItemsWrapper>
      {!emptyCartList && <TotalPrice />}
    </StyledCart>
  );
};

const StyledCart = styled.div`
  margin: 0 auto;
  width: 62%;
`;

const CartItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  height: ${props => props.isHave || '600px'};
  background-color: ${props =>
    props.isHave ? `${colors.white}` : `${colors.lightGray}`};
  border-radius: 3px;
  a {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-decoration: none;
    color: ${colors.classRedyellow};
    font-size: 1.5rem;
  }
`;

const Title = styled.h2`
  margin: 4% 0;
  font-weight: bold;
`;

export default Cart;
