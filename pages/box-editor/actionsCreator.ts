export default {
  createObject: (objectType: string, size: ISize, position: IPosition): Actions.BoxEditor.ICreateObject => {
    return {
      objectType,
      size,
      position,
      type: 'BoxEditor/CreateObject'
    };
  },
  moveObject: (id: number, position: IPosition): Actions.BoxEditor.IMoveObject => {
    return {
      id,
      position,
      type: 'BoxEditor/MoveObject'
    };
  },
  selectArea: (): Actions.BoxEditor.ISelectArea => {
    return {
      type: 'BoxEditor/SelectArea'
    };
  },
  selectBox: (id: number): Actions.BoxEditor.ISelectBox => {
    return {
      type: 'BoxEditor/SelectBox',
      id
    };
  },
  updateArea: (patch: Partial<IArea>): Actions.BoxEditor.IUpdateSelectedArea => {
    return {
      type: 'BoxEditor/UpdateSelectedArea',
      patch
    };
  },
  updateBox: (patch: Partial<IAreaObject>): Actions.BoxEditor.IUpdateSelectedBox => {
    return {
      type: 'BoxEditor/UpdateSelectedBox',
      patch
    };
  }
};
