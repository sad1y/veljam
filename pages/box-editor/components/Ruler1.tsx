import * as React from 'react';

interface IProps {
  width: number;
  height: number;
}

const majorDivisors = [2, 2.5, 2];

const subdivideX = (ctx, x, delta, index, y, height, subdivs) => {

  ctx.moveTo(x, y - 0.5);
  ctx.lineTo(x, y + height - 0.5);
  console.log({ x, y, delta, index })

  if (index > 10) {
    return;
  }

  let div = 0;

  if (subdivs != null && index >= 0) {
    div = subdivs[index % subdivs.Length];
  }
  else if (index < 0) {
    div = majorDivisors[(-index - 1) % majorDivisors.length];
  }
  else {
    return;
  }

  for (let i = 0; i < div; i++) {
    if ((delta / div) > 3.5) {
      subdivideX(ctx, x + delta * i / div, delta / div, index + 1, y, height / div, subdivs);
    }
  }
}

const renderRuler = (ctx, offset, width, height) => {
  let majorSkip = 1;
  let majorSkipPower = 0;
  const majorDivisionLength = 8;
  let majorDivisionPixels = majorDivisionLength * 1; // ScaleFactor.ScaleScalar(majorDivisionLength);
  const subdivs = null;
  const offsetPixels = 0;
  let startMajor = (offset / majorDivisionLength) - 1;
  let endMajor = ((offset + width) / majorDivisionLength) + 1;

  console.log(endMajor);

  while (majorDivisionPixels * majorSkip < 60) {
    majorSkip *= majorDivisors[majorSkipPower % majorDivisors.length];
    ++majorSkipPower;
  }

  startMajor = (majorSkip * Math.floor(startMajor / majorSkip));

  for (let major = startMajor; major <= endMajor; major += majorSkip) {
    let majorMarkPos = (major * majorDivisionPixels) - offsetPixels;
    const majorText = major.toString();
    console.log(majorText);

    
    // SubdivideX(e.Graphics, pen, ClientRectangle.Left + majorMarkPos, majorDivisionPixels * majorSkip, -majorSkipPower, ClientRectangle.Top, ClientRectangle.Height, subdivs);
    subdivideX(ctx, majorMarkPos, majorDivisionPixels * majorSkip, -majorSkipPower, 0, /* ClientRectangle.Height */ height, subdivs);
    // e.Graphics.DrawString(majorText, Font, textBrush, new PointF(ClientRectangle.Left + majorMarkPos, ClientRectangle.Bottom), textFormat);

    ctx.font = '12px Arial';
    ctx.fillText(majorText, majorMarkPos + 5, 15);
  }
}

class Ruler extends React.Component<IProps> {
  canvas: React.RefObject<HTMLCanvasElement>;

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  drawTop(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    const lineHeight = this.props.height * 0.75;
    const lineLen = this.props.width;
    const space = lineLen / 10;

    ctx.beginPath();

    // for (let i = 0; i < 10; i++) {
    //   const x = i * space + (space - 0.5);
    //   ctx.moveTo(x, lineLen);
    //   ctx.lineTo(x, lineHeight);
    // }

    // ctx.moveTo(0, this.props.height - 0.5);
    // ctx.lineTo(lineLen, this.props.height - 0.5);
    renderRuler(ctx, 0, lineLen, this.props.height);

    ctx.lineWidth = 1;
    ctx.stroke();

    // ctx.font = '30px Arial';
    // ctx.fillText('0', 0, 50);
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
