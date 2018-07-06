import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actionCreators from '../../actions';
import Layout from './components/Layout';

type Props = typeof actionCreators;

class BoxEditorPage extends React.Component<Props> {
  render() {
    return (
      <Layout height={500} width={500} contentHeight={930} contentWidth={780}>
        <div style={{ width: 930, height: 780 }} />
      </Layout>
    );
  }
}

export default connect(
  null,
  disptacher => bindActionCreators(actionCreators, disptacher)
)(BoxEditorPage);
