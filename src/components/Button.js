import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, style }) => {
  return (
    <StyledButton onClick={onClick} style={{ ...style }}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object
};

const StyledButton = styled.button`
  border: 0;
  background-color: transparent;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 0;
  }
`;

export default Button;
