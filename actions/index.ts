const actionCreators = {
  tickClock: (isServer: boolean): Actions.Tests.ITickClock => {
    return {
      type: 'TickClock',
      light: !isServer,
      ts: Date.now()
    };
  },
  failure: (error: any): Actions.Tests.IFailure => {
    return {
      type: 'Failure',
      error
    };
  },
  startClock: (): Actions.Tests.IStartClock => {
    return {
      type: 'StartClock'
    };
  },
  increment: (): Actions.Tests.IIncrement => {
    return { type: 'Increment' };
  },
  decrement: (): Actions.Tests.IDecrement => {
    return {
      type: 'Decrement'
    };
  },
  reset: (): Actions.Tests.IReset => {
    return {
      type: 'Reset'
    };
  }
};

export default actionCreators;
