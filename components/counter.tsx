import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import actionCreators from '../actions';

type Props = typeof actionCreators & { count: number };

class Counter extends Component<Props> {
  render() {
    const { count, increment, decrement, reset } = this.props;
    return (
      <div>
        <h1>
          Count: <span>{count}</span>
        </h1>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
      </div>
    );
  }
}

export default connect(
  (state: State.IRoot) => ({ count: state.testing.count }),
  dispatcher => bindActionCreators(actionCreators, dispatcher)
)(Counter);
