import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../actions';
import Layout from './components/Layout';

type Props = typeof actionCreators;

class BoxEditorPage extends React.Component<Props> {
  render() {
    return <Layout />;
  }
}

export default connect(
  null,
  disptacher => bindActionCreators(actionCreators, disptacher)
)(BoxEditorPage);
