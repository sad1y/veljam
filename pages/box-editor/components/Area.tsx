import * as React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd';
import { IViewportState } from 'components/viewport';
import { dropTypes } from '../constants';
import actionsCreator from '../actionsCreator';
import Box from './Box';
import { snapToGrid } from './utils';

interface IOwnProps {
  width: number;
  height: number;
  canDrop?: boolean;
  lastDroppedItem?: any;
  isOver?: boolean;
  connectDropTarget?: ConnectDropTarget;
  getViewportContext: () => IViewportState;
}

type Props = IOwnProps & State.IBoxEditor & typeof actionsCreator;

const target = {
  drop(props: Props, monitor: DropTargetMonitor, component) {
    const result = monitor.getItem();

    if (!result) return;

    const clientOffset = monitor.getClientOffset();
    const areaBounds = (findDOMNode(component) as Element).getBoundingClientRect();
    const viewport = props.getViewportContext();
    const size = result.size as ISize;
    const x = Math.round((clientOffset.x + -areaBounds.left) / viewport.scale) - size.width / 2;
    const y = Math.round((clientOffset.y + -areaBounds.top) / viewport.scale) - size.height / 2;
    const coords = snapToGrid(x, y);

    if (result.id) {
      if (props.moveObject) {
        props.moveObject(result.id, coords);
      }
    } else {
      if (props.createObject) {
        props.createObject(result.type, size, coords);
      }
    }
  }
};

class Area extends React.Component<Props> {
  shouldComponentUpdate(nextProps) {
    return !nextProps.isOver;
  }

  render() {
    const { width, height, connectDropTarget } = this.props;

    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={{ width, height, boxSizing: 'border-box' }}>
          {this.props.objects.map(props => <Box key={props.id} {...props} />)}
        </div>
      )
    );
  }
}

const DndArea = DropTarget([dropTypes.move, dropTypes.new], target, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Area);

export default connect(
  (state: State.IRoot) => state.boxEditor,
  actionsCreator
)(DndArea);
