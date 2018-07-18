import * as React from 'react';

export default (props: IAreaObject) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: props.size.width,
        height: props.size.height,
        top: props.position.y,
        left: props.position.x,
        backgroundColor: props.color,
        boxSizing: 'border-box',
        border: '1px solid #444'
      }}
    />
  );
};
