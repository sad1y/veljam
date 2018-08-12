import * as React from 'react';
import { DragLayer, XYCoord } from 'react-dnd';
import { objectKind, dropTypes } from '../constants';
import { snapToGrid } from './utils';
import { Box } from './Box';
import SnapGrid from './SnapGrid';

export interface CustomDragLayerProps {
  item?: any;
  itemType?: string;
  initialOffset?: XYCoord;
  currentOffset?: XYCoord;
  clientOffset?: XYCoord;
  isDragging?: boolean;
  scale: number;
  width: number;
  height: number;
  scrollTop: number;
  scrollLeft: number;
  offset: IPosition;
}

const layerStyles: React.CSSProperties = {
  position: 'absolute',
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  right: 0,
  bottom: 0
};

class DragLayerImpl extends React.Component<CustomDragLayerProps> {
  element = React.createRef<HTMLDivElement>();

  getItemStyles() {
    // props: CustomDragLayerProps, size: ISize
    const { item, scale, initialOffset, currentOffset, clientOffset } = this.props;
    const size = item ? item.size : 0;

    if (!initialOffset || !currentOffset || !this.element.current) {
      return {
        display: 'none'
      };
    }

    const bounds = this.element.current.getBoundingClientRect();
    const x = Math.round((clientOffset.x - bounds.left) / scale) - size.width / 2;
    const y = Math.round((clientOffset.y - bounds.top) / scale) - size.height / 2;

    const pos = snapToGrid(x, y);

    pos.x = pos.x * scale; // + (size.width * scale - size.width) / 2;
    pos.y = pos.y * scale; // + (size.height * scale - size.height) / 2;

    const transform = `translate(${pos.x}px, ${pos.y}px)`;
    return {
      transform,
      WebkitTransform: transform
    };
  }

  renderItem() {
    const { scale, item } = this.props;

    switch (item.type) {
      case objectKind.box: {
        return <Box color={item.color} isDragging={false} size={item.size} scale={scale} />;
      }
      default:
        return null;
    }
  }

  render() {
    const { itemType, isDragging } = this.props;
    if (!(isDragging && (itemType === dropTypes.move || itemType === dropTypes.new))) {
      return null;
    }

    return (
      <div style={layerStyles} ref={this.element}>
        <div style={this.getItemStyles()}>{this.renderItem()}</div>
        <SnapGrid width={this.props.width} height={this.props.height} scale={this.props.scale} />
      </div>
    );
  }
}

export default DragLayer<CustomDragLayerProps>(monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  clientOffset: monitor.getClientOffset(),
  isDragging: monitor.isDragging()
}))(DragLayerImpl);
