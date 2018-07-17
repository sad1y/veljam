import * as React from 'react';
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd';
import constants from '../constants';

interface IProps {
  width: number;
  height: number;
  canDrop?: boolean;
  lastDroppedItem?: any;
  isOver?: boolean;
  connectDropTarget?: ConnectDropTarget;
  onDrop: (item: any) => void;
}

const target = {
  drop(props: IProps, monitor: DropTargetMonitor) {
    const clientOffset = monitor.getClientOffset();
    const initClientOffset = monitor.getInitialClientOffset();
    const initSourceClientOffset = monitor.getInitialSourceClientOffset();
    const sourceClientOffset = monitor.getSourceClientOffset();
    const differenceFromInitialOffset = monitor.getDifferenceFromInitialOffset();
    
    // console.log({ clientOffset, initClientOffset, initSourceClientOffset, sourceClientOffset, differenceFromInitialOffset });

    console.log(monitor.getItem());
    
    // props.onDrop(monitor.getItem());
  }
};

class Area extends React.Component<IProps> {
  render() {
    const { width, height, connectDropTarget } = this.props;

    return connectDropTarget && connectDropTarget(<div style={{ width, height, boxSizing: 'border-box' }} />);
  }
}

export default DropTarget([constants.MOVE_BOX, constants.NEW_BOX], target, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Area);
