import * as React from 'react';
import { connect } from 'react-redux';
import actionCreators from '../actionsCreator';
import PanelsHost from 'components/PanelHost';
import ToolPanel from './ToolPanel';

interface IProps {
  panels: State.IBoxEditor['panels'];
  onPositionChanged: (id: number, delta: IPosition) => any;
}

const PanelLayer = (props: IProps) => {
  return (
    <PanelsHost
      panels={[
        {
          header: <div>tools</div>,
          body: <ToolPanel />,
          canMove: true,
          initPosition: { x: 100, y: 140 }
        },
        {
          header: <div>property</div>,
          body: <span>...</span>,
          canMove: true,
          initPosition: { x: 900, y: 100 }
        }
      ]}
      onPositionChanged={props.onPositionChanged}
    />
  );
};

export default connect(
  (state: State.IRoot) => ({ panels: state.boxEditor.panels }),
  {
    onPositionChanged: actionCreators.movePanel
  }
)(PanelLayer);
