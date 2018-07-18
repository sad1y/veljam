import * as React from 'react';
import styled from 'styled-components';
import Ruler from './Ruler';
import StatusPanel from './StatusPanel';
import CursorTracker from 'react-cursor-position';

interface IProps {
  width?: number;
  height?: number;
  contentWidth: number;
  contentHeight: number;
}

export interface IViewportState {
  width: number;
  height: number;
  scrollLeft: number;
  scrollTop: number;
  mousePosition: IPosition;
  offset: IPosition;
  scale: number;
}

interface IViewProps {
  offset: number;
}

export const ViewportContext = React.createContext({
  getContext: () => ({
    height: 0,
    mousePosition: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    scale: 1,
    scrollLeft: 0,
    scrollTop: 0,
    width: 0
  })
});

const rulerSize = 20;

export class Layout extends React.Component<IProps, IViewportState> {
  constructor(props: IProps) {
    super(props);

    this.scrollHandler = this.scrollHandler.bind(this);
  }

  scrollEl: HTMLElement;
  viewportEl: HTMLElement;
  contextValue;

  state = {
    width: 0,
    height: 0,
    scrollLeft: 0,
    scrollTop: 0,
    offset: {
      x: 0,
      y: 0
    },
    mousePosition: {
      x: 0,
      y: 0
    },
    scale: 1
  };

  componentDidMount() {
    const div = this.scrollEl;
    if (!div) return;

    div.addEventListener('scroll', this.scrollHandler);

    this.setState(() => ({
      height: div.clientHeight,
      width: div.clientWidth,
      offset: {
        x: div.clientWidth / 2,
        y: div.clientHeight / 2
      }
    }));
  }

  componentWillUnmount() {
    const div = this.scrollEl;
    if (!div) return;

    div.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler() {
    const scrollEl = this.scrollEl;
    if (!scrollEl) return;

    const { scrollLeft, scrollTop } = scrollEl;

    if (this.state.scrollLeft === scrollLeft && this.state.scrollTop === scrollTop) {
      return;
    }

    this.setState(() => ({ scrollLeft, scrollTop }));
  }

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

  getContext = () => {
    this.contextValue = this.contextValue || { getContext: () => ({ ...this.state }) };
    return this.contextValue;
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

  updateMousePosition = (position: IPosition) => {
    this.setState(state => ({
      mousePosition: {
        x: Math.round((position.x + state.scrollLeft - rulerSize - state.offset.x) / state.scale),
        y: Math.round((position.y + state.scrollTop - rulerSize - state.offset.y) / state.scale)
      }
    }));
  };

  render() {
    const { scrollTop, scrollLeft, scale, offset } = this.state;
    const { contentHeight, contentWidth } = this.props;

    return (
      <Frame {...this.props}>
        <Ruler
          contentSize={contentWidth}
          offsetSize={offset.x}
          height={rulerSize}
          orientation="Horizontal"
          scrollPosition={scrollLeft}
          scale={scale}
        />
        <Ruler
          contentSize={contentHeight}
          offsetSize={offset.y}
          height={rulerSize}
          orientation="Vertical"
          scrollPosition={scrollTop}
          scale={scale}
        />
        <CursorTracker shouldDecorateChildren={false} onPositionChanged={props => this.updateMousePosition(props.position)}>
          <ScrollContainer
            offset={rulerSize}
            innerRef={el => {
              this.scrollEl = el;
            }}
          >
            <Viewport
              margins={[offset.y, offset.x]}
              height={contentHeight}
              width={contentWidth}
              scale={scale}
              innerRef={el => {
                this.viewportEl = el;
              }}
            >
              <ViewportContext.Provider value={this.getContext()}>{this.props.children}</ViewportContext.Provider>
            </Viewport>
          </ScrollContainer>
        </CursorTracker>
        <StatusPanel
          mousePosition={this.state.mousePosition}
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
  background-color: #fff;

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
  background-color: #e5e5e5;
  overflow: auto;
  overflow-y: scroll;
  overflow-x: scroll;

  top: ${(props: IViewProps) => props.offset}px;
  bottom: ${(props: IViewProps) => props.offset}px;
  left: ${(props: IViewProps) => props.offset}px;
  right: 0;
`;
