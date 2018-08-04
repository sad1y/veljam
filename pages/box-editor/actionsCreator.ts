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
    }
  }
};
