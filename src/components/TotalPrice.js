import React, { useContext } from 'react';
import { CartContext } from '../App';
import styled from 'styled-components';
import CountUp from 'react-countup';
import colors from '../styles/colors';
import { INITIAL_NUMBER, COUNT_UP_DURATION } from '../constants';

const TotalPrice = () => {
  const { cartList } = useContext(CartContext);

  const getTotalPrice = () =>
    cartList.reduce(
      (totalPrice, { product: { price }, selected, quantity }) =>
        selected ? totalPrice + price * quantity : totalPrice,
      0
    );

  const getDiscountPrice = () =>
    cartList.reduce((totalDiscount, item) => {
      const {
        product: { price },
        selected,
        quantity,
        coupon: { type, discount }
      } = item;

      return selected
        ? type === 'rate'
          ? totalDiscount + (price * quantity) / discount
          : type === 'amount'
          ? totalDiscount + discount
          : totalDiscount
        : totalDiscount;
    }, 0);

  return (
    <PriceWrapper>
      <StyledPrice>
        <Title>결제 금액</Title>
        <Table>
          <TableBody>
            <tr>
              <th>총 상품 금액</th>
              <td>{getTotalPrice().toLocaleString()} 원</td>
            </tr>
            <tr className="discount-text">
              <th>상품 할인 금액</th>
              <td>- {getDiscountPrice().toLocaleString()}원</td>
            </tr>
          </TableBody>
          <TableFoot>
            <tr>
              <th>최종 가격</th>
              <td>
                <CountUp
                  start={INITIAL_NUMBER}
                  end={getTotalPrice() - getDiscountPrice()}
                  duration={COUNT_UP_DURATION}
                  separator=","
                  suffix="원"
                />
              </td>
            </tr>
          </TableFoot>
        </Table>
      </StyledPrice>
    </PriceWrapper>
  );
};

const PriceWrapper = styled.div`
  position: relative;
  margin-top: 3%;
  padding-top: 4%;
  border-top: solid;
  border-width: 1px;
  border-color: ${colors.darkGray};
`;

const StyledPrice = styled.div`
  position: absolute;
  right: 0;
  width: 40%;
  padding: 3%;
  background-color: ${colors.lightGray};
  border-radius: 3px;
`;

const Title = styled.h4`
  margin: 0px;
  padding-bottom: 15px;
  line-height: 28px;
  font-size: 20px;
  font-weight: bold;
  color: ${colors.darkGray};
  letter-spacing: -0.3px;
`;

const Table = styled.table`
  width: 100%;
`;

const TableBody = styled.tbody`
  tr {
    th,
    td {
      margin: 0px;
      padding: 7px 0px;
      font-weight: normal;
      font-size: 14px;
      font-weight: normal;
      line-height: 20px;
      letter-spacing: -0.2px;
      color: ${colors.gray};
    }
    th {
      text-align: left;
    }
    td {
      text-align: right;
    }
  }
  .discount-text {
    th,
    td {
      color: ${colors.orange};
    }
  }
`;

const TableFoot = styled.tfoot`
  tr {
    th,
    td {
      margin: 0px;
      padding-top: 15px;
      border-top: 1px solid ${colors.darkGray};
      ont-size: 14px;
      font-weight: bold;
      line-height: 20px;
      letter-spacing: -0.2px;
      color: ${colors.darkGray};
    }
    th {
      text-align: left;
    }
    td {
      text-align: right;
    }
  }
`;

export default TotalPrice;
