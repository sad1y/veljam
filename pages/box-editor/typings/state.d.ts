declare namespace State {
  interface IBoxEditor {
    objects: IAreaObject[];
    selected: LayoutProperty | BoxProperty;
  }
}
