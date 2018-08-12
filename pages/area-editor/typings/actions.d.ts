declare namespace Actions.BoxEditor {
  interface ICreateObject {
    type: 'BoxEditor/CreateObject';
    objectType: string;
    size: ISize;
    position: IPosition;
  }

  interface IMoveObject {
    type: 'BoxEditor/MoveObject';
    id: number;
    position: IPosition;
  }

  interface ISelectBox {
    type: 'BoxEditor/SelectBox';
    id: number;
  }

  interface ISelectArea {
    type: 'BoxEditor/SelectArea';
  }

  interface IUpdateSelectedArea {
    type: 'BoxEditor/UpdateSelectedArea';
    patch: object;
  }

  interface IUpdateSelectedBox {
    type: 'BoxEditor/UpdateSelectedBox';
    patch: object;
  }

  interface IDeleteObject {
    type: 'BoxEditor/DeleteObject';
    id: number;
  }
}
