import * as React from 'react';
import { connect } from 'react-redux';
import actionCreators from '../actionsCreator';
import PanelsHost from 'components/PanelHost';
import Panel from 'components/Panel';
import ToolPanel from './ToolPanel';

interface IProps {
  panels: State.IBoxEditor['panels'];
  onPositionChanged: (id: number, delta: IPosition) => any;
}

const PanelTypeMap = {
  ToolPanel
};

const PanelLayer = (props: IProps) => {
  const panels = props.panels.map(f => (
    <Panel key={f.id} position={f.position}>
      {PanelTypeMap[f.type]()}
    </Panel>
  ));

  return <PanelsHost onPositionChanged={props.onPositionChanged}>{panels}</PanelsHost>;
};

export default connect(
  (state: State.IRoot) => ({ panels: state.boxEditor.panels }),
  {
    onPositionChanged: actionCreators.movePanel
  }
)(PanelLayer);
