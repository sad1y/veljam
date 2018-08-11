import * as React from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import { dropTypes, objectKind } from '../constants';

type Props = IAreaObject & DragSourceProps & { onClick: () => void };

const boxSource = {
  beginDrag(props: IAreaObject) {
    return {
      id: props.id,
      size: props.size,
      color: props.color,
      position: props.position,
      type: objectKind.box
    };
  }
};

export const Box = (props: { size: ISize; color: string; isDragging: boolean; scale?: number }) => {
  const { size, color, isDragging } = props;
  const opacity = isDragging ? 0.4 : 1;
  const scale = props.scale || 1;

  return (
    <div
      style={{
        width: size.width * scale,
        height: size.height * scale,
        backgroundColor: color || '#fff',
        boxSizing: 'border-box',
        border: '1px solid #444',
        opacity
      }}
    />
  );
};

export class DraggableBox extends React.Component<Props> {
  componentDidMount() {
    const { connectDragPreview } = this.props;
    if (connectDragPreview) {
      // Use empty image as a drag preview so browsers don't draw it
      // and we can draw whatever we want on the custom drag layer instead.
      connectDragPreview(getEmptyImage(), {
        // IE fallback: specify that we'd rather screenshot the node
        // when it already knows it's being dragged so we can hide it with CSS.
        captureDraggingState: true
      });
    }
  }

  handleClick = e => {
    e.stopPropagation();
    this.props.onClick();
    return false;
  };

  render() {
    const { isDragging, size, color, position, connectDragSource } = this.props;

    return (
      connectDragSource &&
      connectDragSource(
        <div
          style={{
            position: 'absolute',
            top: position.y,
            left: position.x
          }}
          onClick={this.handleClick}
        >
          <Box size={size} isDragging={isDragging} color={color} />
        </div>
      )
    );
  }
}

export default DragSource(dropTypes.move, boxSource, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
}))(DraggableBox);
