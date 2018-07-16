import * as React from 'react';
import styled from 'styled-components';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Viewport from 'components/viewport';
import PanelLayer from './PanelLayer';

class Layout extends React.Component {
  render() {
    return (
      <Container>
        <DragDropContextProvider backend={HTML5Backend}>
          <Viewport contentWidth={780} contentHeight={930}>
            <div style={{ width: 780, height: 930, border: 'green solid 3px', boxSizing: 'border-box' }} />
          </Viewport>

          {/* <div style={{ position: 'absolute', width: 500, height: 500, overflow: 'auto' }}>
            <div style={{ width: 780, height: 930, border: 'yellow solid 3px', boxSizing: 'border-box' }} />
          </div> */}
          <PanelLayer />
        </DragDropContextProvider>
      </Container>
    );
  }
}

export default Layout;

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
