import * as React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd';
import { IViewportState } from 'components/viewport';
import { dropTypes } from '../constants';
import actionsCreator from '../actionsCreator';

interface IOwnProps {
  width: number;
  height: number;
  canDrop?: boolean;
  lastDroppedItem?: any;
  isOver?: boolean;
  connectDropTarget?: ConnectDropTarget;
  getViewportContext: () => IViewportState;
}

type Props = IOwnProps;

const target = {
  drop(props: Props, monitor: DropTargetMonitor, component) {
    const result = monitor.getDropResult();

    if (!result) return;

    if (!result.id) {
      const clientOffset = monitor.getClientOffset();
      const areaBounds = (findDOMNode(component) as Element).getBoundingClientRect();
      const viewport = props.getViewportContext();
      const x = Math.round((clientOffset.x + -areaBounds.left) / viewport.scale);
      const y = Math.round((clientOffset.y + -areaBounds.top) / viewport.scale);

      //   if (props.createObject) {
      //     props.createObject(result.type, result.size, { x, y });
      //   }
    }
  }
};

class Area extends React.Component<Props> {
  shouldComponentUpdate(nextProps) {
    return !nextProps.isOver;
  }

  render() {
    console.log('re-render');

    const { width, height, connectDropTarget } = this.props;

    return connectDropTarget && connectDropTarget(<div style={{ width, height, boxSizing: 'border-box' }} />);
  }
}

const DndArea = DropTarget([dropTypes.move, dropTypes.new], target, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Area);

export default DndArea;

// export default connect(
//   (state: State.IRoot) => state.boxEditor,
//   actionsCreator
// )(DndArea);
