import { combineReducers } from 'redux';
import boxEditor, { boxEditorInitState } from '../pages/area-editor/reducers';
import pathJpsTrace, { jpsTraceInitState } from '../pages/path-builder-jps-trace/reducers';

export const rootState: State.Root = {
  boxEditor: boxEditorInitState,
  pathJpsTrace: jpsTraceInitState
};

export default combineReducers({ boxEditor, pathJpsTrace });
