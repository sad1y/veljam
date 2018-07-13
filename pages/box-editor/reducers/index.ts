export const boxEditorInitState: State.IBoxEditor = {
  panels: [
    {
      id: 1,
      position: { x: 100, y: 400 },
      type: 'ToolPanel'
    }
  ]
};

type KnownActions = Actions.BoxEditor.IMovePanel;

const reducer = (state = boxEditorInitState, action: KnownActions): State.IBoxEditor => {
  switch (action.type) {
    case 'BoxEditor/MovePanel': {
      const index = state.panels.findIndex(f => f.id === action.id);

      if (index < 0) {
        return state;
      }

      const el = state.panels[index];
      const newPosition = {
        x: el.position.x + action.delta.x,
        y: el.position.y + action.delta.y
      };

      return {
        ...state,
        panels: [...state.panels.slice(0, index), { ...el, position: newPosition }, ...state.panels.slice(index + 1)]
      };
    }

    default:
    // const ever: never = action;
  }

  return state;
};

export default reducer;
