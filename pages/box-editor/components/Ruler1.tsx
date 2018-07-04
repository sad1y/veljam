import * as React from 'react';

interface IProps {
  width: number;
  height: number;
}

const tickHeights = [1.0, 0.6, 0.35, 0.25, 0.1, 0.075];
const integerSubDivisors = [2.0, 5.0, 2.0];
const majorDivisors = [2.0, 2.5, 2.0];
const halfTickThickness = 0.5;

const subdivideX = (ctx, x, y, divisionInPixels, division, index, height, tickLevel, subdivs) => {
  const tickHeight = height * tickHeights[tickLevel];

  const derX = Math.round(x) + halfTickThickness;
  ctx.moveTo(derX, y);
  ctx.lineTo(derX, y - tickHeight);

  if (index > 10 || tickLevel >= 5) return;

  let subdiv = 0;

  if (subdivs != null && index >= 0) {
    subdiv = subdivs[index % subdivs.length];
  } else {
    if (index >= 0) return;
    let subDivIndex = (-index - 1) % integerSubDivisors.length;
    if (tickLevel == 0 && subDivIndex != 0 && divisionInPixels <= 80.0) {
      subDivIndex = 1;
      height *= 0.6;
    }
    if (tickLevel == 1 && divisionInPixels >= 40.0) subDivIndex = 1;
    subdiv = integerSubDivisors[subDivIndex];
  }

  const divisionInPixels1 = divisionInPixels / subdiv;
  const division1 = division / subdiv;

  if ((subdivs == null && division1 != Math.round(division1)) || divisionInPixels1 <= 6.5) return;

  for (let i = 0; i < subdiv; ++i) {
    const x1 = x + (divisionInPixels * i) / subdiv;
    subdivideX(ctx, x1, y, divisionInPixels1, division1, index + 1, height, tickLevel + 1, subdivs);
  }
};

const subdivideY = (ctx, x, y, divisionInPixels, division, index, width, tickLevel, subdivs) => {
  const tickHeight = width * tickHeights[tickLevel];

  const derY = Math.round(y) + halfTickThickness;
  ctx.moveTo(x, derY);
  ctx.lineTo(x - tickHeight, derY);

  if (index > 10 || tickLevel >= 5) return;

  let subdiv = 0;

  if (subdivs != null && index >= 0) {
    subdiv = subdivs[index % subdivs.length];
  } else {
    if (index >= 0) return;
    let subDivIndex = (-index - 1) % integerSubDivisors.length;
    if (tickLevel == 0 && subDivIndex != 0 && divisionInPixels <= 80.0) {
      subDivIndex = 1;
      width *= 0.6;
    }
    if (tickLevel == 1 && divisionInPixels >= 40.0) subDivIndex = 1;
    subdiv = integerSubDivisors[subDivIndex];
  }

  const divisionInPixels1 = divisionInPixels / subdiv;
  const division1 = division / subdiv;

  if ((subdivs == null && division1 != Math.round(division1)) || divisionInPixels1 <= 6.5) return;

  for (let i = 0; i < subdiv; ++i) {
    const y1 = y + (divisionInPixels * i) / subdiv;
    subdivideX(ctx, x, y1, divisionInPixels1, division1, index + 1, width, tickLevel + 1, subdivs);
  }
};

const renderRuler = (ctx, adjustedOffset, width, height) => {
  const originalPixelsSize = width; // scaleFactor.unscale(height)
  let division = 1.0;
  let majorSkipPower = 0;
  const dpu = 1;
  let majorDivisionPixels = dpu; // scaleFactor.scale(dpu)
  const subdivisions = null;
  const offsetPixels = 0; // scaleFactor.scale(offset);
  let start = -adjustedOffset / dpu - 1;
  let end = (originalPixelsSize - adjustedOffset) / dpu + 1;

  while (majorDivisionPixels * division < 60.0) {
    division *= majorDivisors[majorSkipPower % majorDivisors.length];
    ++majorSkipPower;
  }

  start = division * Math.floor(start / division);

  let index = start;

  while (index <= end) {
    const majorMarkPos = index * majorDivisionPixels + offsetPixels;
    subdivideX(
      ctx,
      majorMarkPos,
      height - 1,
      majorDivisionPixels * division,
      division,
      -majorSkipPower,
      height - 1,
      0,
      subdivisions
    );
    ctx.font = '10px Arial';
    ctx.fillText(index, majorMarkPos + 2, 8);
    index += division;
  }
};

class Ruler extends React.Component<IProps> {
  canvas: React.RefObject<HTMLCanvasElement>;

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  drawTop(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    ctx.beginPath();

    renderRuler(ctx, 100, this.props.width, this.props.height);

    ctx.lineWidth = 1;
    ctx.stroke();
  }

  componentDidMount() {
    this.drawTop(this.canvas.current);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Ruler.draw(this.canvas.current);
  }

  render() {
    return <canvas ref={this.canvas} width={this.props.width} height={this.props.height} />;
  }
}

export default Ruler;
