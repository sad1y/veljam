import * as React from 'react';
import { Layout as Viewport, ViewportContext } from 'components/viewport';
import Area from './Area';
import CustomDragLayer from './CustomDragLayer';
import { connect } from 'react-redux';

interface ConnectedViewportProps {
  area: IArea;
}

const AreaViewport = (props: ConnectedViewportProps) => {
  if (!props.area) return null;
  const size = props.area.size;

  return (
    <Viewport contentWidth={size.width} contentHeight={size.height}>
      <ViewportContext.Consumer>
        {state => (
          <>
            <Area width={size.width} height={size.height} scale={state.scale} />
            <CustomDragLayer width={size.width} height={size.height} {...state} />
          </>
        )}
      </ViewportContext.Consumer>
    </Viewport>
  );
};

export default connect((state: State.Root) => ({ area: state.areasEditor.current }))(AreaViewport);
