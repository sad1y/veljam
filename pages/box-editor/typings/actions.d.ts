declare namespace Actions.BoxEditor {
  interface ICreateObject {
    type: 'BoxEditor/CreateObject';
    objectType: string;
    size: ISize;
    position: IPosition;
  }
}
