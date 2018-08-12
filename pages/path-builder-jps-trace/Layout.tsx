import * as React from 'react';
import { connect } from 'react-redux';
import Blocks from './components/Blocks';

const Layout = (props: State.JPSTarceState) => {
  return (
    <div>
      {/* <AreaSelector /> */}
      <Blocks blocks={props.blocks} />
    </div>
  );
};

export default connect((state: State.IRoot) => state.pathJpsTrace)(Layout);
