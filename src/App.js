import React, { useState, createContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import Products from './pages/products';
import Cart from './pages/cart';

export const CartContext = createContext();

const App = () => {
  const [cartList, setCartList] = useState([]);
  const globalState = { cartList, setCartList };

  return (
    <CartContext.Provider value={globalState}>
      <GlobalStyle />
      <Header />
      <Route exact path="/" render={() => <Redirect to="/products" />} />
      <Route path="/products" component={Products} />
      <Route path="/cart" component={Cart} />
    </CartContext.Provider>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

export default App;
