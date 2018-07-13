import * as React from 'react';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget, XYCoord } from 'react-dnd';

import { FloatingPanelType } from './Panel';

interface IProps extends React.Props<any> {
  canDrop?: boolean;
  isOver?: boolean;
  connectDropTarget?: ConnectDropTarget;
  onPositionChanged: (id: number, delta: IPosition) => any;
}


const boxTarget = {
  drop(props, monitor: DropTargetMonitor, component) {
    if (!component) {
      return;
    }
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
    // const left = Math.round(item.left + delta.x);
    // const top = Math.round(item.top + delta.y);

    // component.moveBox(item.id, left, top);

	console.log(props, item.id, delta);
	
	return delta;
  }
};

const style: React.CSSProperties = {
  height: '100%',
  width: '100%'
};

class PanelHost extends React.Component<IProps> {
  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#222';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return connectDropTarget && connectDropTarget(<div style={{ ...style, backgroundColor }}>{this.props.children}</div>);
  }
}

export default DropTarget(FloatingPanelType, boxTarget, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(PanelHost);
