import * as React from 'react';

interface IProps {
  width: number;
  height: number;
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

    for (let i = 0; i < 10; i++) {
      const x = i * space + (space - 0.5);
      ctx.moveTo(x, lineLen);
      ctx.lineTo(x, lineHeight);
    }

    ctx.moveTo(0, this.props.height);
    ctx.lineTo(lineLen, this.props.height);

    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = '30px Arial';
    ctx.fillText('0', 0, 50);
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
