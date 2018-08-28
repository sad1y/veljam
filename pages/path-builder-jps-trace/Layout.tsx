import * as React from 'react';
import Blocks from './components/Blocks';
import AreaSelector from './components/AreaSelector';
import styled from 'styled-components';

export default () => {
  return (
    <Layout>
      <Blocks />
      <AreaSelector />
    </Layout>
  );
};

const Layout = styled.div`
  position: relative;
`;
