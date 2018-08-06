import { toColour } from '../utils';
import { area } from '../../../data/area';

export const boxEditorInitState: State.IBoxEditor = {
  objects: [],
  selected: null
};

type KnownActions =
  | Actions.BoxEditor.ICreateObject
  | Actions.BoxEditor.IMoveObject
  | Actions.BoxEditor.ISelectBox
  | Actions.BoxEditor.ISelectLayout
  | Actions.BoxEditor.IUpdateBox
  | Actions.BoxEditor.IUpdateLayout;

const reducer = (state = boxEditorInitState, action: KnownActions): State.IBoxEditor => {
  switch (action.type) {
    case 'BoxEditor/CreateObject': {
      const objects = state.objects;
      const newObj = {
        id: objects.length + 1,
        size: action.size,
        position: action.position,
        type: action.type,
        color: null,
        tags: []
      };

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

    case 'BoxEditor/SelectBox': {
      return {
        ...state,
        selected: area.objects.find(f => f.id === action.id)
      };
    }

    case 'BoxEditor/SelectLayout': {
      return {
        ...state,
        selected: area
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
