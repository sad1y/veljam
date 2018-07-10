import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../actions';
import Layout from './components/Layout';

type Props = typeof actionCreators;

class BoxEditorPage extends React.Component<Props> {
  render() {
    return (
      <Layout height={1000} width={1000} contentHeight={930} contentWidth={780}>
        <div style={{ width: 780, height: 930, border: 'green solid 3px', boxSizing: 'border-box' }} />
      </Layout>
    );
  }
}

export default connect(
  null,
  disptacher => bindActionCreators(actionCreators, disptacher)
)(BoxEditorPage);
