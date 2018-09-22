import * as React from 'react';
import { connect } from 'react-redux';
import BlockMarkup from './BlockMarkup';
import areaToMap from 'alghoritms/areaToJumpPointMap';

interface BlocksProps {
  area: IArea;
}

class Blocks extends React.Component<BlocksProps> {
  renderBlocks() {
    const area = this.props.area;
    if (!area) return [];
    const blocks = areaToMap(area);
    const dimension = area.dimension || 100;

    if (!blocks) return [];

    const result = [];

    for (let row = 0; row < blocks.length; row++) {
      const columns = blocks[row];
      for (let column = 0; column < columns.length; column++) {
        const cell = columns[column];

        result.push(<BlockMarkup key={`${row}_${column}`} row={row} column={column} size={dimension} block={cell} />);
      }
    }

    return result;
  }

  render() {
    return <>{this.renderBlocks()}</>;
  }
}

export default connect((state: State.Root) => ({
  area: state.areasEditor.current
}))(Blocks);
