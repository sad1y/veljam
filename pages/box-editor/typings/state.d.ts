declare namespace State {
  interface IBoxEditor {
    area: IArea;
    selected: { type: 'area'; object: IArea } | { type: 'box'; object: IAreaObject };
  }
}
