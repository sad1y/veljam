interface IPosition {
  x: number;
  y: number;
}

interface ISize {
  width: number;
  height: number;
}

interface IAreaObject {
  id: number;
  type: string;
  position: IPosition;
  size: ISize;
  color: string;
}
