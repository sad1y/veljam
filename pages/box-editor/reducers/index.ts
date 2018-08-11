import { toColour } from '../utils';
import { area } from '../../../data/area';

export const boxEditorInitState: State.IBoxEditor = {
  area: area,
  selected: { type: 'area', object: area }
};

type KnownActions =
  | Actions.BoxEditor.ICreateObject
  | Actions.BoxEditor.IDeleteObject
  | Actions.BoxEditor.IMoveObject
  | Actions.BoxEditor.ISelectBox
  | Actions.BoxEditor.ISelectArea
  | Actions.BoxEditor.IUpdateSelectedBox
  | Actions.BoxEditor.IUpdateSelectedArea;

const reducer = (state = boxEditorInitState, action: KnownActions): State.IBoxEditor => {
  switch (action.type) {
    case 'BoxEditor/CreateObject': {
      if (!state.area) return state;

      const objects = state.area.objects;
      const newObj = {
        id: state.area.objects.length + 1,
        size: action.size,
        position: action.position,
        type: action.type,
        color: null,
        tags: []
      };

      newObj.color = toColour(JSON.stringify(newObj));

      return {
        ...state,
        area: { ...state.area, objects: [...objects, newObj] }
      };
    }

    case 'BoxEditor/DeleteObject': {
      return {
        ...state,
        area: { ...state.area, objects: state.area.objects.filter(f => f.id !== action.id) }
      };
    }

    case 'BoxEditor/MoveObject': {
      return {
        ...state,
        area: { ...state.area, objects: updateObjectById(action.id, { position: action.position })(state.area.objects) }
      };
    }

    case 'BoxEditor/SelectBox': {
      const obj = state.area.objects.find(f => f.id === action.id);

      return {
        ...state,
        selected: { type: 'box', object: obj }
      };
    }

    case 'BoxEditor/SelectArea': {
      return {
        ...state,
        selected: { type: 'area', object: state.area }
      };
    }

    case 'BoxEditor/UpdateSelectedArea': {
      const patch = action.patch as any;
      const name = patch.name || state.area.name;
      const width = patch.width || state.area.size.width;
      const height = patch.height || state.area.size.height;

      const area = { ...state.area, name, size: { width, height } };

      return {
        selected: { type: 'area', object: area },
        area
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
