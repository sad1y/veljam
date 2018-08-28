import * as React from 'react';
import styled from 'styled-components';
import actionsCreator from '../actionsCreator';
import { connect } from 'react-redux';

interface AreaSelectorProps {
  areas: IArea[];
  selectedArea: IArea;
}

const AreaSelector = (props: AreaSelectorProps & typeof actionsCreator) => {
  return (
    <Container>
      <select onChange={f => props.selectArea(f.target.value)} value={props.selectedArea ? props.selectedArea.name : ''}>
        <option key={'__not-selected'} value={null} />
        {props.areas.map(f => (
          <option key={f.name} value={f.name}>
            {f.name}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default connect(
  (state: State.Root) => ({ areas: state.pathJpsTrace.areas, selectedArea: state.pathJpsTrace.selectedArea }),
  actionsCreator
)(AreaSelector);

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
  z-index: 5;

  &:hover {
    opacity: 1;
  }
`;
