import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../App';
import styled from 'styled-components';
import Button from './Button';
import { TiHeartFullOutline, TiHeartOutline } from 'react-icons/ti';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import colors from '../styles/colors';
import { UP_TO_THREE, INITIAL_QUANTITY, INITIAL_NUMBER } from '../constants';

const ProductItem = product => {
  const { id, title, coverImage, price } = product;
  const { cartList, setCartList } = useContext(CartContext);

  const toggleItem = id => {
    const callback = ({ product }) => product.id !== id;
    cartList.every(callback)
      ? cartList.length < UP_TO_THREE
        ? setCartList([
            ...cartList,
            {
              product,
              selected: true,
              quantity: INITIAL_QUANTITY,
              coupon: { type: '', discount: INITIAL_NUMBER }
            }
          ])
        : alert('장바구니에는 3개까지 담을 수 있어요. :)')
      : setCartList(cartList.filter(callback));
  };

  const isHave = cartList.some(({ product }) => product.id === id);

  return (
    <ProductItemWrapper>
      <ImageWrapper>
        <LazyLoadImage src={coverImage} effect="blur" alt={title} />
      </ImageWrapper>
      <Title>{title}</Title>
      <Price>{price.toLocaleString()}원</Price>
      <StyledHoverButton>
        <Button onClick={toggleItem.bind(this, id)} style={StyledHeartButton}>
          {isHave ? (
            <TiHeartFullOutline color={`${colors.pink}`} size="26px" />
          ) : (
            <TiHeartOutline color={`${colors.white}`} size="26px" />
          )}
        </Button>
      </StyledHoverButton>
    </ProductItemWrapper>
  );
};

ProductItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    coverImage: PropTypes.string,
    price: PropTypes.number
  })
};

const ProductItemWrapper = styled.div`
  position: relative;
  margin: 2% 3%;
  width: 280px;
  height: 290px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  background-color: ${colors.lazyGray};
  height: 190px;
  img {
    display: block;
    width: 100%;
    height: 190px;
    border-radius: 3px;
  }
  .lazy-load-image-background.blur.lazy-load-image-loaded {
    transition: 0.3s;
    &:hover {
      transform: scale(1.1);
      transition: 0.3s;
    }
  }
`;

const Title = styled.title`
  display: -webkit-box;
  padding: 6px 0;
  height: 40px;
  line-height: 20px;
  font-size: 15px;
  font-weight: normal;
  letter-spacing: -0.2px;
  color: ${colors.classBlack};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Price = styled.p`
  position: absolute;
  bottom: 10px;
  font-size: 15px;
  font-weight: 700;
  color: ${colors.classBlack};
`;

const StyledHeartButton = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '0',
  width: '26px',
  height: '26px'
};

const StyledHoverButton = styled.div`
  position: absolute;
  top: 1%;
  right: 2%;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  &:hover {
    background-color: ${colors.transparentWhite};
  }
`;

export default ProductItem;
