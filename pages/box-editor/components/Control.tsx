import * as React from 'react';
import { DragSource, ConnectDragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import styled from 'styled-components';
import { dropTypes } from '../constants';

export interface IProps {
  type: string;
  size: ISize;
  icon: React.ReactElement<any>;
  connectDragSource?: ConnectDragSource;
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
  isDragging: monitor.isDragging()
}))(Control);

const Icon = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 auto;
`;
