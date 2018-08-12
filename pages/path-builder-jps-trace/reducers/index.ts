export const jpsTraceInitState: State.JPSTarceState = {
  area: null,
  blocks: null
};

type KnownActions = Actions.JPSTrace.SelectArea;

const reducer = (state = jpsTraceInitState, action: KnownActions): State.JPSTarceState => {
  switch (action.type) {
    case 'JPSTrace/SelectArea': {
      if (!action.area) {
        return jpsTraceInitState;
      }

      return {
        area: action.area,
        blocks: null // calculateJPSBlocks(action.area)
      };
    }
  }

  return state;
};

export default reducer;
