import { toColour } from '../utils';

let initArea: IArea = {
  name: 'unknown',
  size: {
    height: 2000,
    width: 2000
  },
  objects: []
};

export const boxEditorInitState: State.IBoxEditor = {
  current: { ...initArea },
  selected: { type: 'area', object: { ...initArea } }
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
      if (!state.current) return state;

      const objects = state.current.objects;
      const newObj = {
        id: state.current.objects.length + 1,
        size: action.size,
        position: action.position,
        type: action.type,
        color: null,
        tags: []
      };

      newObj.color = toColour(JSON.stringify(newObj));

      return {
        ...state,
        current: { ...state.current, objects: [...objects, newObj] }
      };
    }

    case 'BoxEditor/DeleteObject': {
      return {
        ...state,
        current: { ...state.current, objects: state.current.objects.filter(f => f.id !== action.id) }
      };
    }

    case 'BoxEditor/MoveObject': {
      return {
        ...state,
        current: { ...state.current, objects: updateObjectById(action.id, { position: action.position })(state.current.objects) }
      };
    }

    case 'BoxEditor/SelectBox': {
      const obj = state.current.objects.find(f => f.id === action.id);

      return {
        ...state,
        selected: { type: 'box', object: obj }
      };
    }

    case 'BoxEditor/SelectArea': {
      return {
        ...state,
        selected: { type: 'area', object: state.current }
      };
    }

    case 'BoxEditor/UpdateSelectedArea': {
      if (state.selected.type !== 'area') return state;
      const patch = action.patch as any;
      const area = state.selected.object;
      const name = patch.name || area.name;
      const width = patch.width || area.size.width;
      const height = patch.height || area.size.height;

      const updatedArea = { ...area, name, size: { width, height } };

      return {
        selected: { type: 'area', object: area },
        current: updatedArea
      };
    }

    case 'BoxEditor/UpdateSelectedBox': {
      if (state.selected.type !== 'box') return state;
      const patch = action.patch as any;
      const box = state.selected.object;
      const color = patch.color || box.color;
      const tags = patch.tags || box.tags;

      const updatedBox = { ...box, color, tags };

      return {
        selected: { type: 'box', object: updatedBox },
        current: { ...state.current, objects: updateObjectById(box.id, updatedBox)(state.current.objects) }
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
