declare namespace State {
  interface IBoxEditor {
    panels: {
      id: number;
      type: string;
      position: IPosition;
    }[];
  }
}
