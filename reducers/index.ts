import { combineReducers } from 'redux';
import boxEditor, { boxEditorInitState } from '../pages/area-editor/reducers';

export const rootState: State.Root = {
  areasEditor: boxEditorInitState,
};

export default combineReducers({ areasEditor: boxEditor, });
