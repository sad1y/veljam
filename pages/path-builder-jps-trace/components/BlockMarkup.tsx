import * as React from 'react';
import styled from 'styled-components';

interface BlockProps {
  block: JPSBlock;
  size: number;
  row: number;
  column: number;
}

export default (props: BlockProps) => {
  if (!props.block || props.block.isBlocked) {
    return <Block style={createBlockStyle(props)} />;
  }
  const labelStyle = createLabelStyle(props.size);
  return (
    <Block style={createBlockStyle(props)}>
      <div style={labelStyle}>{props.block.jumpDistance['LeftUp']}</div>
      <div style={labelStyle}>{props.block.jumpDistance['Up']}</div>
      <div style={labelStyle}>{props.block.jumpDistance['RightUp']}</div>
      <div style={labelStyle}>{props.block.jumpDistance['Left']}</div>
      <div style={labelStyle} />
      <div style={labelStyle}>{props.block.jumpDistance['Right']}</div>
      <div style={labelStyle}>{props.block.jumpDistance['LeftDown']}</div>
      <div style={labelStyle}>{props.block.jumpDistance['Down']}</div>
      <div style={labelStyle}>{props.block.jumpDistance['RightDown']}</div>
    </Block>
  );
};

const createBlockStyle = (props: BlockProps) => ({
  backgroundColor: props.block.isBlocked ? '#000' : '#fff',
  left: `${props.size * props.column}px`,
  top: `${props.size * props.row}px`,
  width: props.size,
  height: props.size
});

const createLabelStyle = (size: number): React.CSSProperties => ({
  flex: `1 1 ${(size || 0) / 3}px`,
  height: `${(size || 0) / 3}px`,
  textAlign: 'center',
  lineHeight: `${(size || 0) / 3}px`
});

const Block = styled.div`
  box-shadow: inset 0px 0px 0 0.5px rgba(0, 0, 0, 0.5);
  position: absolute;
  flex-wrap: wrap;
  display: flex;
`;
