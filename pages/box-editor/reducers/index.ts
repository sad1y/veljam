export const testingInitState: State.ITestingState = {
  count: 0,
  error: null,
  lastUpdate: 0,
  light: false,
  placeholderData: null
};

type KnownActions =
  | Actions.Tests.IDecrement
  | Actions.Tests.IFailure
  | Actions.Tests.IIncrement
  | Actions.Tests.ILoadDataSuccess
  | Actions.Tests.IReset
  | Actions.Tests.ITickClock;

const reducer = (state = testingInitState, action: KnownActions): State.ITestingState => {
  switch (action.type) {
    case 'Failure':
      return {
        ...state,
        ...{ error: action.error }
      };

    case 'Increment':
      return {
        ...state,
        ...{ count: state.count + 1 }
      };

    case 'Decrement':
      return {
        ...state,
        ...{ count: state.count - 1 }
      };

    case 'Reset':
      return {
        ...state,
        ...{ count: testingInitState.count }
      };

    case 'LoadDataSuccess':
      return {
        ...state,
        ...{ placeholderData: action.data }
      };

    case 'TickClock':
      return {
        ...state,
        ...{ lastUpdate: action.ts, light: !!action.light }
      };
    default:
      const ever: never = action;
  }

  return state;
};

export default reducer;
