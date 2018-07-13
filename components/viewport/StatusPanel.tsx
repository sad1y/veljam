import * as React from 'react';
import styled from 'styled-components';

interface IStatusPanelProps {
  scale: number;
  zoomIn: any;
  zoomOut: any;
  size: number;
  mousePosition: {
    x: number;
    y: number;
  };
}

const StatusPanel = (props: IStatusPanelProps) => {
  const { mousePosition } = props,
    mouseX = mousePosition ? ~~mousePosition.x : 0,
    mouseY = mousePosition ? ~~mousePosition.y : 0;

  const scale = ~~((props.scale || 1) * 100);

  return (
    <StatusPanelLayout {...props}>
      <span>
        {mouseX}
        {', '}
        {mouseY}
      </span>
      <div className="scale-panel">
        <button onClick={props.zoomOut}>-</button>
        <span>{scale}%</span>
        <button onClick={props.zoomIn}>+</button>
      </div>
    </StatusPanelLayout>
  );
};

export default StatusPanel;

const StatusPanelLayout = styled.div`
  position: absolute;
  height: ${(props: IStatusPanelProps) => props.size}px;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: right;
  .scale-panel {
    display: inline-block;
  }
`;
