import React from 'react';
import { connect } from 'react-redux';

import actionCreators from '../actions';
import Page from '../components/page';

class Index extends React.Component {
  static async getInitialProps(props) {
    const { store, isServer } = props.ctx;
    store.dispatch(actionCreators.tickClock(isServer));

    if (!store.getState().placeholderData) {
      store.dispatch(actionCreators.loadData());
    }

    return { isServer };
  }

  componentDidMount() {
    this.props.dispatch(actionCreators.startClock());
  }

  render() {
    return <Page title="Index Page" linkTo="/other" NavigateTo="Other Page" />;
  }
}

export default connect()(Index);
