import * as React from 'react';
import styled from 'styled-components';
import Control from './Control';
import Box from 'components/icons/Box';
import constants from '../constants';

export default () => {
  return (
    <ControlList>
      <Control icon={<Box size={30} />} type={constants.NEW_BOX} name="box" />
    </ControlList>
  );
};

const ControlList = styled.div`
  span {
    font-size: 10px;
  }
`;
