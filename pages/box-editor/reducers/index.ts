import { toColour } from '../utils';

export const boxEditorInitState: State.IBoxEditor = {
  objects: []
};

type KnownActions = Actions.BoxEditor.ICreateObject;

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

    default:
    // const ever: never = action;
  }

  return state;
};

export default reducer;
