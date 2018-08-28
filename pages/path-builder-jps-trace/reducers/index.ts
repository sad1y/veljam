import { getArea } from '../../../data/area';
import areaToMap from '../../../alghoritms/areaToMap';

export const jpsTraceInitState: State.JPSTarceState = {
  area: getArea(),
  blocks: [[]]
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
        blocks: areaToMap(action.area)
      };
    }
  }

  return state;
};

export default reducer;
