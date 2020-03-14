import React, { useContext } from 'react';
import { CartContext } from '../App';
import styled from 'styled-components';
import Button from './Button';
import { TiHeartFullOutline } from 'react-icons/ti';
import colors from '../styles/colors';
import PropTypes from 'prop-types';

const CartItem = ({ item, coupons }) => {
  const { cartList, setCartList } = useContext(CartContext);
  const {
    product: { id, title, coverImage, price, availableCoupon },
    selected,
    quantity
  } = item;

  const toggleSelected = id => {
    const toggled = cartList.map(item => {
      const { product, selected } = item;
      return product.id === id ? { ...item, selected: !selected } : item;
    });
    setCartList(toggled);
  };

  const handleChangeCount = (id, { target: { value } }) => {
    const changed = cartList.map(item => {
      const { product } = item;
      return product.id === id ? { ...item, quantity: value } : item;
    });
    setCartList(changed);
  };

  const handleChangeCoupon = (id, { target: { value } }) => {
    const [type, discount] = value.split(',');
    const changed = cartList.map(item => {
      const { product } = item;
      return product.id === id
        ? { ...item, coupon: { type, discount: +discount } }
        : item;
    });
    setCartList(changed);
  };

  const renderCouopns = () => {
    return (
      <>
        <option value="none, 0">쿠폰 선택 가능</option>
        {coupons.map(coupon => (
          <option
            value={[coupon.type, coupon.discountRate || coupon.discountAmount]}
            key={coupon.title}
          >
            {coupon.title}
          </option>
        ))}
      </>
    );
  };

  const removeCartlist = id => {
    setCartList(cartList.filter(({ product }) => product.id !== id));
  };

  return (
    <>
      <ProductItemWrapper>
        <ImageWrapper>
          <Img src={coverImage} alt={title} />
        </ImageWrapper>
        <StyledCheckbox
          type="checkbox"
          checked={selected}
          onChange={toggleSelected.bind(this, id)}
        />
        <Title>{title}</Title>
        <StyledHoverButton>
          <Button
            onClick={removeCartlist.bind(this, id)}
            style={StyledHeartButton}
          >
            <TiHeartFullOutline color={`${colors.pink}`} size="26px" />
          </Button>
        </StyledHoverButton>
        <SelectWrapper>
          <input
            type="number"
            value={quantity}
            onChange={handleChangeCount.bind(this, id)}
          />
          <select onChange={handleChangeCoupon.bind(this, id)}>
            {availableCoupon === false ? (
              <option>쿠폰을 사용할 수 없는 제품이에요.</option>
            ) : (
              renderCouopns()
            )}
          </select>
        </SelectWrapper>
        <Price>{price.toLocaleString()}원</Price>
      </ProductItemWrapper>
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    coverImage: PropTypes.string,
    price: PropTypes.number
  }),
  coupons: PropTypes.array
};

const ProductItemWrapper = styled.div`
  position: relative;
  margin: 2% 3%;
  width: 280px;
  height: 290px;
  overflow: hidden;
`;

const StyledCheckbox = styled.input`
  position: absolute;
  top: 8px;
  left: 8px;
  cursor: pointer;
  transform: scale(1.3);
`;

const ImageWrapper = styled.div`
  overflow: hidden;
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: 190px;
  border-radius: 3px;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;

const Title = styled.title`
  display: -webkit-box;
  height: 40px;
  padding: 6px 0;
  line-height: 20px;
  font-size: 15px;
  font-weight: normal;
  letter-spacing: -0.2px;
  color: ${colors.classBlack};
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.p`
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

export default CartItem;
