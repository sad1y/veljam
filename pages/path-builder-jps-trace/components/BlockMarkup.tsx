import * as React from 'react';
import styled from 'styled-components';

interface BlockProps {
  block: JPSBlock;
  size: number;
}

export default (props: BlockProps) => {
  if (!props.block || props.block.isBlocked) {
    return <Block isBlocked={true} />;
  }

  return (
    <Block size={props.size}>
      <Label size={props.size}>{props.block.jumpDistance['LeftUp']}</Label>
      <Label size={props.size}>{props.block.jumpDistance['Up']}</Label>
      <Label size={props.size}>{props.block.jumpDistance['RightUp']}</Label>
      <Label size={props.size}>{props.block.jumpDistance['Left']}</Label>
      <Label size={props.size} />
      <Label size={props.size}>{props.block.jumpDistance['Right']}</Label>
      <Label size={props.size}>{props.block.jumpDistance['LeftDown']}</Label>
      <Label size={props.size}>{props.block.jumpDistance['Down']}</Label>
      <Label size={props.size}>{props.block.jumpDistance['RightDown']}</Label>
    </Block>
  );
};

const Block = styled.div`
  width: ${(props: { size: number }) => props.size}px;
  height: ${(props: { size: number }) => props.size}px;
  box-shadow: inset 0px 0px 0 0.5px rgba(0, 0, 0, 0.5);
  background-color: ${(props: any) => (props.isBlocked ? '#000' : '#fff')};
  flex-wrap: wrap;
  display: flex;
`;

const Label = styled.div`
  flex: 1 1 ${(props: { size?: number }) => (props.size || 0) / 3}px;
  height: ${(props: { size?: number }) => (props.size || 0) / 3}px;
  text-align: center;
  line-height: ${(props: { size?: number }) => (props.size || 0) / 3}px;
`;
