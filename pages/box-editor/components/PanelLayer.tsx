import * as React from 'react';
import PanelsHost from 'components/PanelHost';
import ControlsPanel from './ControlsPanel';

interface IProps {
  onPositionChanged?: (id: number, delta: IPosition) => any;
}

const PanelLayer = (props: IProps) => {
  return (
    <PanelsHost
      panels={[
        {
          header: 'controls',
          body: <ControlsPanel />,
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

export default PanelLayer;
