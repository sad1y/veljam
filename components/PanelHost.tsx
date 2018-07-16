import * as React from 'react';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget, XYCoord } from 'react-dnd';

import Panel, { FloatingPanelType } from './Panel';

interface IPanel {
  header: React.Component;
  body: React.Component;
  initPosition?: IPosition;
  canMove?: boolean;
}

interface IUniquePanel extends IPanel {
  id: number;
  position: IPosition;
}

interface IProps extends React.Props<any> {
  canDrop?: boolean;
  isOver?: boolean;
  connectDropTarget?: ConnectDropTarget;
  onPositionChanged: (id: number, delta: IPosition) => any;
  panels: IPanel[];
}

interface IState {
  panels: IUniquePanel[];
}

const boxTarget = {
  drop(props, monitor: DropTargetMonitor, component: PanelHost) {
    if (!component) {
      return;
    }
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
    // const left = Math.round(item.left + delta.x);
    // const top = Math.round(item.top + delta.y);

    // component.moveBox(item.id, left, top);

    component.movePanelHandler(item.id, delta);

    return delta;
  }
};

const inactiveStyle: React.CSSProperties = {
  height: '100%',
  width: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  top: 0,
  left: 0
};

const activeStyle: React.CSSProperties = {
  ...inactiveStyle,
  pointerEvents: 'auto'
};

class PanelHost extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    if (!props.panels || !props.panels.length) throw new Error('panels cant be empty or null');

    this.state = {
      panels: props.panels.map((f, index) => ({ ...f, id: index + 1, position: f.initPosition }))
    };
  }

  movePanelHandler = (id: number, delta: IPosition) => {
    const panels = this.state.panels;
    const index = panels.findIndex(f => f.id === id);

    if (index < 0) {
      return;
    }

    const panel = panels[index];
    const updatedPanel = { ...panel, position: { x: panel.position.x + delta.x, y: panel.position.y + delta.y } };
    const newPanels = [...panels.slice(0, index), updatedPanel, ...panels.slice(index + 1)];

    this.setState(() => ({
      panels: newPanels
    }));
  };

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const backgroundColor = canDrop ? 'rgba(52, 52, 52, 0.8)' : 'inherit';
    const style = isOver ? activeStyle : inactiveStyle;

    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={{ ...style, backgroundColor }}>{this.state.panels.map(f => <Panel key={f.id} {...f} />)}</div>
      )
    );
  }
}

export default DropTarget(FloatingPanelType, boxTarget, (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(PanelHost);
