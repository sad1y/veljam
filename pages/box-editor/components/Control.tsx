import * as React from 'react';
import { DragSource, ConnectDragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import styled from 'styled-components';

export interface IProps {
  name: string;
  type: string;
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
      type: props.type
    };
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

export default DragSource(
  (props: IProps) => props.type,
  prototypeSource,
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(ToolsPanel);

const Icon = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 auto;
`;
