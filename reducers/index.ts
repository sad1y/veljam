import { combineReducers } from 'redux';
import testing, { testingInitState } from '../pages/testing/reducers';

export const rootState: State.IRoot = {
    testing: testingInitState
};

export default combineReducers({ testing });
