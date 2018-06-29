import { combineReducers } from 'redux';
import testing, { testingInitState } from '../pages/box-editor/reducers';

export const rootState: State.IRoot = {
  testing: testingInitState
};

export default combineReducers({ testing });
