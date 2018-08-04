export const snapToGrid = (x: number, y: number): IPosition => {
  const snappedX = Math.round(x / 100) * 100;
  const snappedY = Math.round(y / 100) * 100;

  return {
      x: snappedX > 0 ? snappedX : 0,
      y: snappedY > 0 ? snappedY : 0
  }
};
