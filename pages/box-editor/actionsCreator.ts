export default {
  movePanel: (id: number, delta: IPosition): Actions.BoxEditor.IMovePanel => {
    return {
      id,
      delta,
      type: 'BoxEditor/MovePanel'
    };
  }
};
