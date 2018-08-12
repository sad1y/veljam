import { combineReducers } from 'redux';
import boxEditor, { boxEditorInitState } from '../pages/area-editor/reducers';
import jpsTrace, { jpsTraceInitState } from '../pages/path-builder-jps-trace/reducers';

export const rootState: State.IRoot = {
  boxEditor: boxEditorInitState,
  pathJpsTrace: jpsTraceInitState
};

export default combineReducers({ boxEditor, jpsTrace });
