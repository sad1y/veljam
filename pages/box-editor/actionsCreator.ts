export default {
  createObject: (objectType: string, size: ISize, position: IPosition): Actions.BoxEditor.ICreateObject => {
    return {
      objectType,
      size,
      position,
      type: 'BoxEditor/CreateObject'
    };
  }
};
