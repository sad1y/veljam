import { combineReducers } from 'redux';
import boxEditor, { boxEditorInitState } from '../pages/box-editor/reducers';

export const rootState: State.IRoot = {
  boxEditor: boxEditorInitState
};

export default combineReducers({ boxEditor });
