import * as React from 'react';
import styled from 'styled-components';

interface Props {
  width: number;
  height: number;
  scale: number;
}

export default class SnapGrid extends React.PureComponent<Props> {
  render() {
    let x = 0;
    let y = 0;
    const width = this.props.width * this.props.scale;
    const height = this.props.height * this.props.scale;
    const size = 100 * this.props.scale;
    const components = [];

    while (true) {
      if (x > width) {
        y += size;
        x = 0;

        if (y > height) {
          break;
        }

        continue;
      }

      components.push(<Cell key={`${x}_${y}`} style={{ width: size, height: size, left: x, top: y }} />);

      x += size;
    }

    return components;
  }
}

const Cell = styled.div`
  opacity: 0.2;
  background-color: yellow;
  position: absolute;
  box-sizing: border-box;
  border-bottom: 1px dashed red;
  border-right: 1px dashed red;
  width: 100px;
  height: 100px;
`;
