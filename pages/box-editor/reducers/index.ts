import { toColour } from '../utils';

export const boxEditorInitState: State.IBoxEditor = {
  objects: []
};

type KnownActions = Actions.BoxEditor.ICreateObject | Actions.BoxEditor.IMoveObject;

const reducer = (state = boxEditorInitState, action: KnownActions): State.IBoxEditor => {
  switch (action.type) {
    case 'BoxEditor/CreateObject': {
      const objects = state.objects;
      const newObj = { id: objects.length + 1, size: action.size, position: action.position, type: action.type, color: null };
      newObj.color = toColour(JSON.stringify(newObj));

      return {
        ...state,
        objects: [...objects, newObj]
      };
    }

    case 'BoxEditor/MoveObject': {
      return {
        ...state,
        objects: updateObjectById(action.id, { position: action.position })(state.objects)
      };
    }
  }

  return state;
};

const updateObjectById = (id: number, patch: Partial<IAreaObject>) => (objects: Array<IAreaObject>) => {
  if (!objects) return [];

  return objects.map(f => {
    if (f.id !== id) return f;

    return { ...f, ...patch };
  });
};

export default reducer;
