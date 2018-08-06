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

  interface ISelectLayout {
    type: 'BoxEditor/SelectLayout';
  }

  interface IUpdateLayout {
    type: 'BoxEditor/UpdateLayout';
    size: ISize;
    name: string;
  }

  interface IUpdateBox {
    type: 'BoxEditor/UpdateBox';
    // size: ISize;
    tags: string[];
  }
}
