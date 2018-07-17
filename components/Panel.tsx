import * as React from 'react';
import { DragSource, ConnectDragSource, DragSourceMonitor, DragSourceConnector } from 'react-dnd';
import styled from 'styled-components';

interface IProps {
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
  canMove?: boolean;
  className?: string;
  position: IPosition;
  body: React.ReactElement<any>;
  header: React.ReactElement<any>;
}

export const FloatingPanelType = 'FloatingPanel';

const panelSource = {
  beginDrag(props) {
    return {
      id: props.id
    };
  }
};

const collect = (connect: DragSourceConnector, monitor: DragSourceMonitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

const headerStyle: React.CSSProperties = {
  margin: '-10px -10px 0 -10px',
  padding: '10px',
  cursor: 'move',
  backgroundColor: '#bbb'
};

class Panel extends React.Component<IProps> {
  render() {
    const { isDragging, connectDragSource, header, body, canMove, position } = this.props;
    const headerEl =
      connectDragSource && canMove && header ? (
        connectDragSource(<div style={headerStyle}>{header}</div>)
      ) : (
        <div style={headerStyle}>{header}</div>
      );

    return (
      <div style={{ position: 'absolute', left: position.x, top: position.y, opacity: isDragging ? 0.5 : 1 }}>
        <Layout className={this.props.className}>
          {headerEl}
          {body}
        </Layout>
      </div>
    );
  }
}

const Layout = styled.div`
  box-shadow: 1px 2px 10px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: #fff;
  pointer-events: auto;
`;

export default DragSource(FloatingPanelType, panelSource, collect)(Panel);
