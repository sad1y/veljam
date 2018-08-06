interface IPosition {
  x: number;
  y: number;
}

interface ISize {
  width: number;
  height: number;
}

interface IArea {
  name: string;
  size: ISize;
  objects: Array<IAreaObject>
}

interface IAreaObject {
  id: number;
  type: string;
  position: IPosition;
  size: ISize;
  color: string;
  tags: string[];
}

interface DragSourceProps {
  connectDragSource?: ConnectDragSource;
  isDragging?: boolean;
  isDropped?: boolean;
  connectDragPreview?: ConnectDragPreview;
}
