import * as React from 'react';
import { DragSource, ConnectDragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import styled from 'styled-components';
import { dropTypes } from '../constants';

export interface IProps {
  name: string;
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
    console.log(props);

    return {
      type: props.type,
      size: props.size
    };
  },
  endDrag(props: IProps, monitor: DragSourceMonitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult) {
      alert(`You dropped ${item.name} into ${dropResult.name}!`);
    }
  }
};

class ToolsPanel extends React.Component<IProps> {
  render() {
    const { name, icon, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      connectDragSource &&
      connectDragSource(
        <div style={{ ...style, opacity }}>
          <Icon>{icon}</Icon>
          <span>{name}</span>
        </div>
      )
    );
  }
}

export default DragSource(dropTypes.new, prototypeSource, (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(ToolsPanel);

const Icon = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 auto;
`;
