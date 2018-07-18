import * as React from 'react';
import styled from 'styled-components';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Layout as Viewport, ViewportContext } from 'components/viewport';
import PanelLayer from './PanelLayer';
import Area from './Area';

class Layout extends React.Component {
  render() {
    return (
      <Container>
        <DragDropContextProvider backend={HTML5Backend}>
          <Viewport contentWidth={780} contentHeight={930}>
            {/* <ViewportContext.Consumer>
              {({ getContext }) => (
                
              )}
            </ViewportContext.Consumer> */}
            <Area width={780} height={930} getViewportContext={null}>
              <InnerComponent />
            </Area>
          </Viewport>
          <PanelLayer />
        </DragDropContextProvider>
      </Container>
    );
  }
}

export default Layout;

const InnerComponent = () => {
  return <span>test</span>;
};

const Container = styled.div`
  position: relative;
  height: 500px;
  width: 500px;
  overflow: hidden;
  top: 100px;
  left: 100px;
`;
