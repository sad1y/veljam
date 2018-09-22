declare namespace State {
  interface IBoxEditor {
    current: IArea;
    selected: { type: 'area'; object: IArea } | { type: 'box'; object: IAreaObject };
  }
}
