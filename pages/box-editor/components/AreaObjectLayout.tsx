import * as React from 'react';
import styled from 'styled-components';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PanelLayer from './PanelLayer';
import Area from './AreaViewport';

export default class Layout extends React.Component {
  render() {
    return (
      <Container>
        <DragDropContextProvider backend={HTML5Backend}>
          <Area />
          <PanelLayer />
        </DragDropContextProvider>
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
`;
