declare namespace State {
  interface IBoxEditor {
    objects: {
      id: number;
      type: string;
      position: IPosition;
      size: ISize;
      color: string;
    }[];
  }
}
