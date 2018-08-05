import * as React from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource, ConnectDragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import styled from 'styled-components';
import { dropTypes } from '../constants';

export interface IProps {
  type: string;
  size: ISize;
  icon: React.ReactElement<any>;
  connectDragSource?: ConnectDragSource;
  connectDragPreview?: any;
  isDragging?: boolean;
  isDropped?: boolean;
}

const style: React.CSSProperties = {
  padding: '10px',
  cursor: 'move',
  textAlign: 'center'
};

const prototypeSource = {
  beginDrag(props: IProps) {
    return {
      type: props.type,
      size: props.size
    };
  }
};

class Control extends React.Component<IProps> {
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

  render() {
    const { type, icon, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      connectDragSource &&
      connectDragSource(
        <div style={{ ...style, opacity }}>
          <Icon>{icon}</Icon>
          <span>{type}</span>
        </div>
      )
    );
  }
}

export default DragSource(dropTypes.new, prototypeSource, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
}))(Control);

const Icon = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 auto;
`;
