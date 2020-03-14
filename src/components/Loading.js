import React from 'react';
import styled from 'styled-components';
import { Wave } from 'better-react-spinkit';
import { LOADING_SIZE } from '../constants';

const Loading = () => {
  return (
    <StyledLoading>
      <Wave size={LOADING_SIZE} />
    </StyledLoading>
  );
};

const StyledLoading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Loading;
