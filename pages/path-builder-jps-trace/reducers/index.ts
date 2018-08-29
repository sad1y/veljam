import { getArea } from '../../../data/area';
import areaToMap from '../../../alghoritms/areaToJumpPointMap';

export const jpsTraceInitState: State.JPSTarceState = {
  selectedArea: null,
  areas: [getArea()],
  blocks: [[]]
};

type KnownActions = Actions.JPSTrace.SelectArea;

const reducer = (state = jpsTraceInitState, action: KnownActions): State.JPSTarceState => {
  switch (action.type) {
    case 'JPSTrace/SelectArea': {
      if (!action.areaName) {
        return jpsTraceInitState;
      }

      const area = state.areas.find(f => f.name === action.areaName);

      if (!area) {
        return jpsTraceInitState;
      }

      return {
        selectedArea: area,
        blocks: areaToMap(area),
        areas: state.areas
      };
    }
  }

  return state;
};

export default reducer;
