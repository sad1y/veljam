import * as React from 'react';
import styled from 'styled-components';
import Prototype from './Control';
import Box from 'components/icons/Box';

export default () => {
  return (
    <PrototypeList>
      <Prototype icon={<Box size={30} />} type="NEW_BOX" name="box" />
    </PrototypeList>
  );
};

const PrototypeList = styled.div`
  span {
    font-size: 10px;
  }
`;
