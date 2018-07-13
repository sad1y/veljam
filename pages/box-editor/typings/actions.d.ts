declare namespace Actions.BoxEditor {
  interface IMovePanel {
    type: 'BoxEditor/MovePanel';
    id: number;
    delta: IPosition;
  }
}
