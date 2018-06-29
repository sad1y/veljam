import * as React from 'react';

interface StatusPanelProps {
  scale: number;
  zoomIn: any;
  zoomOut: any;
  mousePosition: {
    x: number;
    y: number;
  };
}

const StatusPanel = (props: StatusPanelProps) => {
  const { mousePosition } = props,
    mouseX = mousePosition ? mousePosition.x : 0,
    mouseY = mousePosition ? mousePosition.y : 0;

  const scale = ~~((props.scale || 1) * 100);

  return (
    <div className="status-panel">
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
    </div>
  );
};

export default StatusPanel;
