import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../actions';
import Page from '../../components/page';

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
    return <Page title="Other Page" linkTo="/" NavigateTo="Index Page" />;
  }
}

export default connect(
  null,
  disptacher => bindActionCreators(actionCreators, disptacher)
)(Other);
