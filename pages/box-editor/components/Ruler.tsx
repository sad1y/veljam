import * as React from 'react';
import { TopRulerLine, LeftRulerLine } from './Styles';

type RulerPosition = 'top' | 'left';

interface RulerProps {
  position: RulerPosition;
  containerSize: number;
  formSize: number;
  unitSize: number;
}

const minClusterSize = 10;

const getClusterSize = (unitSize: number): number => {
  if (unitSize <= 0) return 0;

  let step = 1,
    multiplier = step;

  while (true) {
    const nextVal = multiplier * unitSize;

    if (nextVal > minClusterSize) return nextVal;

    if (multiplier >= 5) step = 5;

    multiplier += step;
  }
};

const getClusterPerGroup = () => {
  return 10;
};

const buildClusterSchema = (unitSize: number, containerSize: number, layoutSize: number) => {
  const clusterSize = getClusterSize(unitSize),
    clusterPerGroup = getClusterPerGroup(),
    groupSize = clusterSize * clusterPerGroup,
    unitPerGroup = groupSize / unitSize,
    clusterPerLayout = layoutSize / clusterSize,
    groupPerLayout = Math.ceil(layoutSize / groupSize),
    offsetSize = (containerSize - layoutSize) / 2,
    groupPerOffset = Math.ceil(offsetSize / groupSize),
    staticOffsetSize = groupPerOffset * groupSize - offsetSize,
    groupPerPage = groupPerLayout + groupPerOffset * 2;

  const count = groupPerPage - groupPerOffset,
    groups = new Array();

  for (let i = -groupPerOffset; count > i; i++) {
    groups.push(i * unitPerGroup);
  }

  return {
    staticOffsetSize,
    clusterPerGroup,
    clusterSize,
    groupSize,
    groups: groups
  };
};

class Ruler extends React.Component<RulerProps, any> {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { unitSize, containerSize, formSize } = this.props;
    const nextUnitSize = nextProps.unitSize,
      nextContainerSize = nextProps.containerSize,
      nextFormSize = nextProps.formSize;

    return unitSize != nextUnitSize || containerSize != nextContainerSize || formSize != nextFormSize;
  }

  render() {
    const { unitSize, containerSize, formSize } = this.props;
    const clusterSchema = buildClusterSchema(unitSize, containerSize, formSize);

    const clusterStyle = {},
      wrapperStyle = {};

    if (this.props.position == 'top') {
      clusterStyle['width'] = clusterSchema.clusterSize;
      wrapperStyle['left'] = -clusterSchema.staticOffsetSize;
    } else {
      clusterStyle['height'] = clusterSchema.clusterSize;
      wrapperStyle['top'] = -clusterSchema.staticOffsetSize;
    }

    const groups = [],
      groupCluster = [];

    for (let i = 0; clusterSchema.clusterPerGroup > i; i++) {
      groupCluster.push(<i key={i} style={clusterStyle} />);
    }

    for (let i = 0; clusterSchema.groups.length > i; i++) {
      const groupName = ~~clusterSchema.groups[i];
      groups.push(
        <div key={groupName}>
          <label>
            <span>{groupName}</span>
          </label>
          {groupCluster}
        </div>
      );
    }

    return <div style={wrapperStyle}>{groups}</div>;
  }
}

interface IProps extends RulerProps {
  viewportOffset: number;
  size: number;
}

const Wrapper = (props: IProps) => {
  const createStyle = () => {
    return props.position == 'top'
      ? { width: props.containerSize, marginLeft: props.viewportOffset * -1 }
      : { height: props.containerSize, marginTop: props.viewportOffset * -1 };
  };

  const StyledRulerLine = props.position === 'top' ? TopRulerLine : LeftRulerLine;

  return (
    <StyledRulerLine size={props.size}>
      <div className="inner" style={createStyle()}>
        <Ruler {...props} />
      </div>
    </StyledRulerLine>
  );
};

export default Wrapper;
