import * as React from 'react';
import styled from 'styled-components';

type Orientation = 'Horizontal' | 'Vertical';
interface IProps {
  offsetSize: number;
  contentSize: number;
  height: number;
  orientation: Orientation;
  scrollPosition: number;
  scale: number;
}

const tickHeights = [1.0, 0.6, 0.35, 0.25, 0.1, 0.075];
const integerSubDivisors = [2.0, 5.0, 2.0];
const majorDivisors = [2.0, 2.5, 2.0];
const halfTickThickness = 0.5;

const subdivideX = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  divisionInPixels: number,
  division: number,
  index: number,
  size: number,
  tickLevel: number,
  subdivs: number[]
) => {
  const tickHeight = size * tickHeights[tickLevel];

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
      size *= 0.6;
    }
    if (tickLevel == 1 && divisionInPixels >= 40.0) subDivIndex = 1;
    subdiv = integerSubDivisors[subDivIndex];
  }

  const divisionInPixels1 = divisionInPixels / subdiv;
  const division1 = division / subdiv;

  if ((subdivs == null && division1 != Math.round(division1)) || divisionInPixels1 <= 6.5) return;

  for (let i = 0; i < subdiv; ++i) {
    const x1 = x + (divisionInPixels * i) / subdiv;
    subdivideX(ctx, x1, y, divisionInPixels1, division1, index + 1, size, tickLevel + 1, subdivs);
  }
};

const subdivideY = (
  ctx: CanvasRenderingContext2D,
  y: number,
  x: number,
  divisionInPixels: number,
  division: number,
  index: number,
  size: number,
  tickLevel: number,
  subdivs: number[]
) => {
  const tickHeight = size * tickHeights[tickLevel];
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
      size *= 0.6;
    }
    if (tickLevel == 1 && divisionInPixels >= 40.0) subDivIndex = 1;
    subdiv = integerSubDivisors[subDivIndex];
  }

  const divisionInPixels1 = divisionInPixels / subdiv;
  const division1 = division / subdiv;

  if ((subdivs == null && division1 != Math.round(division1)) || divisionInPixels1 <= 6.5) return;

  for (let i = 0; i < subdiv; ++i) {
    const y1 = y + (divisionInPixels * i) / subdiv;
    subdivideY(ctx, y1, x, divisionInPixels1, division1, index + 1, size, tickLevel + 1, subdivs);
  }
};

const deg270 = Math.PI + Math.PI / 2;

const renderVerticalText = (ctx: CanvasRenderingContext2D, text: string, offset: number, textSize: number) => {
  ctx.save();
  ctx.translate(textSize / 2 + 1, 0);
  ctx.rotate(deg270);
  ctx.textAlign = 'right';
  ctx.fillText(text, -(offset + 2), 4);
  ctx.restore();
};

const renderHorizontalText = (ctx: CanvasRenderingContext2D, text: string, offset: number, textSize: number) =>
  ctx.fillText(text, offset + 2, 10);

const renderRuler = (
  ctx: CanvasRenderingContext2D,
  contentSize: number,
  size: number,
  orientation: Orientation,
  scale: number,
  offset: number
) => {
  const dpu = 1;
  const subdivisions = null;
  const originalPixelsSize = contentSize / scale;
  let division = 1.0;
  let majorSkipPower = 0;
  let majorDivisionPixels = dpu * scale;
  let start = (-offset * scale) / dpu - 1;
  let end = (originalPixelsSize + offset * scale) / dpu + 1;

  while (majorDivisionPixels * division < 60.0) {
    division *= majorDivisors[majorSkipPower % majorDivisors.length];
    ++majorSkipPower;
  }

  start = division * Math.floor(start / division);

  let index = start;

  const fontSize = size / 2;
  ctx.font = fontSize + 'px Arial';
  ctx.textAlign = 'left';

  const renderTicks = orientation === 'Horizontal' ? subdivideX : subdivideY;
  const renderLabels = orientation === 'Horizontal' ? renderHorizontalText : renderVerticalText;
  const divisionInPixels = majorDivisionPixels * division;

  while (index <= end) {
    const startDivPosition = index * majorDivisionPixels + offset;

    renderTicks(ctx, startDivPosition, size - 1, divisionInPixels, division, -majorSkipPower, size - 1, 0, subdivisions);
    renderLabels(ctx, index.toString(), startDivPosition, fontSize);

    index += division;
  }
};

class Ruler extends React.Component<IProps> {
  canvas: React.RefObject<HTMLCanvasElement>;

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  draw(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    const { contentSize, height, orientation, scale, offsetSize } = this.props;
    ctx.clearRect(0, 0, offsetSize, offsetSize);

    ctx.beginPath();

    renderRuler(ctx, contentSize, height, orientation, scale, offsetSize);

    if (orientation === 'Horizontal') {
      ctx.moveTo(0, height - halfTickThickness);
      ctx.lineTo(offsetSize * 2 + contentSize * scale, height - halfTickThickness);
    } else {
      ctx.moveTo(height - halfTickThickness, 0);
      ctx.lineTo(height - halfTickThickness, offsetSize * 2 + contentSize * scale);
    }

    ctx.stroke();
  }

  componentDidMount() {
    this.draw(this.canvas.current);
  }

  componentDidUpdate(prevProps: IProps, prevState, snapshot) {
    if (
      this.props.contentSize === prevProps.contentSize &&
      this.props.height === prevProps.height &&
      this.props.offsetSize === prevProps.offsetSize &&
      this.props.scale === prevProps.scale
    ) {
      return;
    }

    this.draw(this.canvas.current);
  }

  renderVertical() {
    const { contentSize, offsetSize, height, scale } = this.props;
    const style = { marginTop: -this.props.scrollPosition + 'px' };

    return (
      <VerticalRuler size={height}>
        <canvas ref={this.canvas} width={height} height={offsetSize * 2 + contentSize * scale} style={style} />
      </VerticalRuler>
    );
  }

  renderHorizontal() {
    const { contentSize, offsetSize, height, scale } = this.props;
    const style = { marginLeft: -this.props.scrollPosition + 'px' };

    return (
      <HorizontalRuler size={height}>
        <canvas ref={this.canvas} width={offsetSize * 2 + contentSize * scale} height={height} style={style} />
      </HorizontalRuler>
    );
  }

  render() {
    return this.props.orientation === 'Horizontal' ? this.renderHorizontal() : this.renderVertical();
  }
}

export default Ruler;

const VerticalRuler = styled.div`
  position: absolute;
  top: ${(props: { size: number }) => props.size - 1 + 'px'};
  bottom: 0;
  left: 0;
  width: ${(props: { size: number }) => props.size + 'px'};
  overflow: hidden;
`;

const HorizontalRuler = styled.div`
  position: absolute;
  left: ${(props: { size: number }) => props.size - 1 + 'px'};
  right: 0;
  top: 0;
  height: ${(props: { size: number }) => props.size + 'px'};
  overflow: hidden;
`;
