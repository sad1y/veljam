import * as React from 'react';
import styled from 'styled-components';
import Control from './Control';
import Box from 'components/icons/Box';
import { objectKind } from '../constants';

export default () => {
  return (
    <ControlList>
      <Control icon={<Box size={30} />} type={objectKind.box} size={{ width: 50, height: 50 }} name="box" />
    </ControlList>
  );
};

const ControlList = styled.div`
  span {
    font-size: 10px;
  }
`;
