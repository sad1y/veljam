export const jpsTraceInitState: State.JPSTarceState = {
  area: null,
  blocks: []
};

type KnownActions = Actions.JPSTrace.SelectArea;

const reducer = (state = jpsTraceInitState, action: KnownActions): State.IBoxEditor => {
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
  }

  return state;
};