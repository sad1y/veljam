import * as React from 'react';
import styled from 'styled-components';
import Ruler from './Ruler';
import StatusPanel from './StatusPanel';
const throttle = require('lodash/throttle');

interface IProps {
  width?: number;
  height?: number;
  contentWidth: number;
  contentHeight: number;
}

interface IState {
  width: number;
  height: number;
  scrollLeft: number;
  scrollTop: number;
  mouseX: number;
  mouseY: number;
  scale: number;
}

interface IViewProps {
  offset: number;
}

const rulerSize = 20;

export default class Layout extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.mouseMoveHandler = throttle(this.mouseMoveHandler, 100).bind(this);
  }

  scrollEl: HTMLElement;
  viewportEl: HTMLElement;

  state = {
    width: 0,
    height: 0,
    scrollLeft: 0,
    scrollTop: 0,
    mouseX: 0,
    mouseY: 0,
    scale: 1
  };

  componentDidMount() {
    const div = this.scrollEl;
    if (!div) return;

    div.addEventListener('scroll', this.scrollHandler);
    div.addEventListener('mousemove', this.mouseMoveHandler);

    this.setState(() => ({
      height: div.clientHeight,
      width: div.clientWidth
    }));
  }

  componentWillUnmount() {
    const div = this.scrollEl;
    if (!div) return;

    div.removeEventListener('scroll', this.scrollHandler);
    div.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  scrollHandler = () => {
    const scrollEl = this.scrollEl;
    if (!scrollEl) return;

    const { scrollLeft, scrollTop } = scrollEl;

    if (this.state.scrollLeft === scrollLeft && this.state.scrollTop === scrollTop) {
      return;
    }

    this.setState(() => ({ scrollLeft, scrollTop }));
  };

  mouseMoveHandler = (event: MouseEvent) => {
    //event.persist();
    // console.log({
    //   mouseX: event.offsetX,
    //   mouseY: event.offsetY
    // });

    this.setState(() => ({
      mouseX: event.offsetX,
      mouseY: event.offsetY
    }));
  };

  getAdjustedScale = (scale: number, delta: number) => {
    const nextScale = scale * delta;
    const nextRouned = ~~nextScale;
    const currentRounded = ~~scale;
    const gap = Math.abs(nextRouned - currentRounded);

    // if zoom out
    if (delta < 1) {
      // check that next threshold is almost reached
      if (gap === 0 && nextScale - 0.05 <= currentRounded) {
        return currentRounded - 1;
      }
      // if we step over threshold and change is not too big
      if (gap === 1) {
        return scale - currentRounded >= currentRounded - nextScale ? currentRounded : nextScale;
      }
    }
    // if zoom in
    else {
      // check that next threshold is almost reached
      if (gap === 0 && nextScale + 0.05 >= currentRounded + 1) {
        return currentRounded + 1;
      }

      // if we step over threshold and change is not too big
      if (gap === 1) {
        return nextRouned - scale >= nextScale - nextRouned ? nextRouned : nextScale;
      }
    }

    return nextRouned === currentRounded ? nextScale : nextRouned;
  };

  zoomIn = (_event, delta: number = 1.12) => {
    this.setState(state => {
      const newScale = this.getAdjustedScale(state.scale, delta);
      return { scale: newScale > 16 ? 16 : newScale };
    });
  };

  zoomOut = (_event, delta: number = 0.89) => {
    this.setState(state => {
      const newScale = this.getAdjustedScale(state.scale, delta);
      return { scale: newScale < 0.2 ? 0.2 : newScale };
    });
  };

  render() {
    const { scrollTop, scrollLeft, width, height, scale } = this.state;
    const { contentHeight, contentWidth } = this.props;

    return (
      <Frame {...this.props}>
        <Ruler
          contentSize={contentWidth}
          offsetSize={width / 2}
          height={rulerSize}
          orientation="Horizontal"
          scrollPosition={scrollLeft}
          scale={scale}
        />
        <Ruler
          contentSize={contentHeight}
          offsetSize={height / 2}
          height={rulerSize}
          orientation="Vertical"
          scrollPosition={scrollTop}
          scale={scale}
        />
        <ScrollContainer
          offset={rulerSize}
          innerRef={el => {
            this.scrollEl = el;
          }}
        >
          <Viewport
            margins={[height / 2, width / 2]}
            height={contentHeight}
            width={contentWidth}
            scale={scale}
            innerRef={el => {
              this.viewportEl = el;
            }}
          >
            {this.props.children}
          </Viewport>
        </ScrollContainer>
        <StatusPanel
          mousePosition={{ x: this.state.mouseX, y: this.state.mouseY }}
          scale={scale}
          zoomIn={this.zoomIn}
          zoomOut={this.zoomOut}
          size={rulerSize}
        />
      </Frame>
    );
  }
}

const Viewport = styled.div`
  margin: ${(props: { margins: number[] }) => (props.margins[0] || 0) + 'px ' + (props.margins[1] || 0) + 'px'};
  width: ${(props: any) => props.width * props.scale}px;
  height: ${(props: any) => props.height * props.scale}px;
  display: inline-block;
  position: relative;
  background-color: yellow;

  > * {
    transform: translate(
        ${props => (props.width * (props.scale - 1)) / 2}px,
        ${props => (props.height * (props.scale - 1)) / 2}px
      )
      scale(${props => props.scale});
  }
`;

const Frame = styled.div`
  position: relative;
  width: ${(props: IProps) => (props.width ? props.width + 'px' : '100%')};
  height: ${(props: IProps) => (props.height ? props.height + 'px' : '100%')};
`;

const ScrollContainer = styled.div`
  position: absolute;
  background-color: red;
  overflow: auto;
  overflow-y: scroll;
  overflow-x: scroll;

  top: ${(props: IViewProps) => props.offset}px;
  bottom: ${(props: IViewProps) => props.offset}px;
  left: ${(props: IViewProps) => props.offset}px;
  right: 0;
`;
