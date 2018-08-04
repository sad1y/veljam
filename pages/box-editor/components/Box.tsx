import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import { dropTypes } from '../constants';

type Props = IAreaObject & DragSourceProps;

const boxSource = {
  beginDrag(props: IAreaObject) {
    return {
      id: props.id,
      size: props.size
    };
  }
};

class Box extends React.Component<Props> {
  render() {
    const { size, position, color, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      connectDragSource &&
      connectDragSource(
        <div
          style={{
            position: 'absolute',
            width: size.width,
            height: size.height,
            top: position.y,
            left: position.x,
            backgroundColor: color,
            boxSizing: 'border-box',
            border: '1px solid #444',
            opacity
          }}
        />
      )
    );
  }
}

export default DragSource(dropTypes.move, boxSource, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Box);
