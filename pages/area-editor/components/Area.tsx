import * as React from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';
import { DropTarget, ConnectDropTarget, DropTargetMonitor } from 'react-dnd';
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
  scale: number;
}

type Props = IOwnProps & State.IBoxEditor & typeof actionsCreator;

const target = {
  drop(props: Props, monitor: DropTargetMonitor, component) {
    const result = monitor.getItem();

    if (!result) return;

    const clientOffset = monitor.getClientOffset();
    const areaBounds = (findDOMNode(component) as Element).getBoundingClientRect();
    const scale = props.scale;
    const size = result.size as ISize;
    const x = Math.round((clientOffset.x - areaBounds.left) / scale) - size.width / 2;
    const y = Math.round((clientOffset.y - areaBounds.top) / scale) - size.height / 2;
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

const getStyles = (props: IOwnProps) => {
  const { scale } = props;

  const style: React.CSSProperties = {
    width: props.width + 'px',
    height: props.height + 'px',
    boxSizing: 'border-box',
    transform:
      `translate(
      ${(props.width * (scale - 1)) / 2}px,
      ${(props.height * (scale - 1)) / 2}px
    ) ` + `scale(${scale})`
  };

  return style;
};

class Area extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return nextProps.scale !== this.props.scale || !nextProps.isOver;
  }

  render() {
    const { connectDropTarget, area } = this.props;

    if (!area) {
      return null;
    }

    return (
      connectDropTarget &&
      connectDropTarget(
        <div style={getStyles(this.props)} onClick={this.props.selectArea}>
          {area.objects.map(props => (
            <Box key={props.id} {...props} onClick={() => this.props.selectBox(props.id)} />
          ))}
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
  (state: State.Root) => state.boxEditor,
  actionsCreator
)(DndArea);
