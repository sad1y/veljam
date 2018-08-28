import * as React from 'react';
import { connect } from 'react-redux';
import BlockMarkup from './BlockMarkup';

interface BlocksProps {
  dimension: number;
  blocks: JPSBlock[][];
}

class Blocks extends React.Component<BlocksProps> {
  *renderBlocks() {
    const blocks = this.props.blocks;
    const dimension = this.props.dimension;

    if (!blocks) return [];

    for (let row = 0; row < blocks.length; row++) {
      const columns = blocks[row];
      for (let column = 0; column < columns.length; column++) {
        const cell = columns[column];

        yield <BlockMarkup row={row} column={column} size={dimension} block={cell} />;
      }
    }
  }

  render() {
    return <>{this.renderBlocks()}</>;
  }
}

export default connect((state: State.Root) => ({
  dimension: state.pathJpsTrace.area.dimension || 100,
  blocks: state.pathJpsTrace.blocks
}))(Blocks);
