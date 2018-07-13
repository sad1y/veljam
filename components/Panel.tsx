import * as React from 'react';
import { DragSource, ConnectDragSource, DragSourceMonitor } from 'react-dnd';
import styled from 'styled-components';

interface IProps {
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  x: number;
  y: number;
}

interface IState {
  x: number;
  y: number;
}

export const FloatingPanelType = 'FloatingPanel';

const panelSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  }
};

const collect = (connect, monitor: DragSourceMonitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

class FloatingPanel extends React.Component<IProps, IState> {
  render() {
    const { isDragging, connectDragSource, x, y } = this.props;
    return (
      connectDragSource &&
      connectDragSource(
        <div style={{ position: 'absolute', left: x, top: y, opacity: isDragging ? 0.5 : 1 }}>
          <Layout>{this.props.children}</Layout>
        </div>
      )
    );
  }
}

const Layout = styled.div`
  border: 1px solid #444;
  padding: 10px;
  background-color: #fff;
`;

export default DragSource(FloatingPanelType, panelSource, collect)(FloatingPanel);
