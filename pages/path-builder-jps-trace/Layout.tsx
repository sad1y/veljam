import * as React from 'react';
import { connect } from 'react-redux';

const Layout = (props: { field: Field }) => {
  return <div>123</div>;
};

export default connect((state: State.IRoot) => state.pathJpsTrace)(Layout);
