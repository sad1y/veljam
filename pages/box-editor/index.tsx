import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../actions';

type Props = typeof actionCreators;

class Other extends React.Component<Props> {
  static async getInitialProps(props) {
    const { store, isServer } = props.ctx;
    store.dispatch(actionCreators.tickClock(isServer));
    return { isServer };
  }

  componentDidMount() {
    this.props.startClock();
  }

  render() {
    return <div />;
  }
}

export default connect(
  null,
  disptacher => bindActionCreators(actionCreators, disptacher)
)(Other);
