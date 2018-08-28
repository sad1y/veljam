import * as React from 'react';
import { connect } from 'react-redux';
import actionsCreator from '../actionsCreator';
import AreaPropsEditor from './AreaPropsEditor';
import BoxPropsEditor from './BoxPropsEditor';

interface Props {
  selected: State.IBoxEditor['selected'];
  updateArea: (obj: Partial<IArea>) => void;
  updateBox: (obj: Partial<IAreaObject>) => void;
}

const PropertySelector = ({ selected, updateArea, updateBox }: Props) => {
  if (!selected) return null;

  switch (selected.type) {
    case 'area': {
      return <AreaPropsEditor area={selected.object} onUpdate={updateArea} />;
    }
    case 'box': {
      return <BoxPropsEditor box={selected.object} onUpdate={updateBox} />;
    }
  }

  return null;
};

export default connect(
  (state: State.Root) => ({
    selected: state.boxEditor.selected
  }),
  {
    updateArea: actionsCreator.updateArea,
    updateBox: actionsCreator.updateBox
  }
)(PropertySelector);
