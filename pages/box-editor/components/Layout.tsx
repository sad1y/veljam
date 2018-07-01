import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// // import { Link } from 'react-router';

// // import { ApplicationState } from '../../contracts';
// // import { actionCreators } from '../../actions/StudyMetadataFormEditor';
// // import { StudyMetadataFormEditorState } from '../../contracts/StudyMetadataFormEditor';

import Ruler from './Ruler';
import Ruler1 from './Ruler1';
import StatusPanel from './StatusPanel';

// // type EditorProps = StudyMetadataFormEditorState & typeof actionCreators;

// class StudyMetadataFormEditor extends React.Component<{}, any> {
//   viewportEl: HTMLElement;
//   layoutEl: HTMLElement;
//   mouseMoveTimer: number;

//   constructor(props) {
//     super(props);
//     const { form } = props;

//     this.state = { form };
//   }

//   private calculateComponentsSizes(scale: number, formWidth: number, formHeight: number) {
//     const win = {
//       width: window.innerWidth,
//       height: window.innerHeight
//     };

//     const viewportBoundaries = this.viewportEl.getBoundingClientRect();

//     const viewport = {
//       width: viewportBoundaries.width - 17, // scroll bar width
//       height: viewportBoundaries.height,
//       scrollY: this.viewportEl.scrollTop,
//       scrollX: this.viewportEl.scrollLeft,
//       offsetX: viewportBoundaries.left,
//       offsetY: viewportBoundaries.top
//     };

//     const form = {
//       width: formWidth * scale,
//       height: formHeight * scale
//     };

//     const containerWidth = viewport.width > form.width ? viewport.width * 2 : form.width * 2;

//     const containerHeight = viewport.height > form.height ? viewport.height * 2 : form.height * 2;

//     const formLayout = {
//       width: containerWidth,
//       height: containerHeight,
//       offsetY: (containerHeight - form.height) / 2,
//       offsetX: (containerWidth - form.width) / 2
//     };

//     return { win, formLayout, form, viewport };
//   }

//   private viewportScrollHandler(e) {
//     if (!this.viewportEl) return;

//     const { scrollLeft, scrollTop } = this.viewportEl;

//     if (this.state.viewport.scrollX == scrollLeft && this.state.viewport.scrollY == scrollTop) {
//       return;
//     }

//     const state = this.state,
//       viewport = state.viewport;

//     const newViewportState = { ...viewport, scrollX: scrollLeft, scrollY: scrollTop };

//     this.setState({ ...state, viewport: newViewportState });
//   }

//   private mouseMoveHandler(e) {
//     e.persist();

//     clearTimeout(this.mouseMoveTimer);

//     const state = this.state;

//     this.mouseMoveTimer = setTimeout(() => {
//       const x = ~~((e.clientX + state.viewport.scrollX - state.viewport.offsetX - state.formLayout.offsetX) / this.props.scale);
//       const y = ~~((e.clientY + state.viewport.scrollY - state.viewport.offsetY - state.formLayout.offsetY) / this.props.scale);

//       const newState = { ...state, mousePosition: { x, y } };

//       this.setState(newState);
//     }, 10);
//   }

//   componentWillReceiveProps(nextProps) {
//     const size = this.calculateComponentsSizes(nextProps.scale, nextProps.form.width, nextProps.form.height);

//     const shouldAjustViewport = this.props.form.height != nextProps.form.height || this.props.form.width != nextProps.form.width;

//     const newState = { ...size, shouldAjustViewport: shouldAjustViewport };

//     this.setState(newState);
//   }

//   componentDidMount() {
//     const size = this.calculateComponentsSizes(this.props.scale, this.props.form.width, this.props.form.height);

//     /* первоначальная центровка формы */
//     const diffX = size.formLayout.width - size.viewport.width;
//     const diffY = size.formLayout.offsetY;
//     size.viewport.scrollX = diffX / 2;
//     size.viewport.scrollY = size.win.height / 2;

//     /* подписка на скролинг */
//     this.viewportEl.addEventListener('scroll', this.viewportScrollHandler.bind(this));

//     const newState = { ...size, shouldAjustViewport: true };

//     this.setState(newState);
//   }

//   componentWillUnmount() {
//     this.viewportEl.removeEventListener('scroll', this.viewportScrollHandler.bind(this));
//   }

//   componentDidUpdate() {
//     if (!this.state.shouldAjustViewport) return;

//     this.viewportEl.scrollLeft = this.state.viewport.scrollX;
//     this.viewportEl.scrollTop = this.state.viewport.scrollY;

//     const currentState = this.state,
//       newState = { ...currentState, shouldAjustViewport: false };

//     this.setState(newState);
//   }

//   getContainerStyle(): any {
//     if (!this.state || !this.state.formLayout) {
//       return { width: 0, height: 0, offsetX: 0, offsetY: 0 };
//     }

//     const { width, height, offsetX, offsetY } = this.state.formLayout;

//     return {
//       width,
//       minHeight: height,
//       paddingTop: offsetY,
//       paddingBottom: offsetY
//     };
//   }

//   getFormStyle() {
//     const { width, height } = this.state.form;

//     return {
//       width: width,
//       minHeight: height,
//       marginLeft: 'auto',
//       marginRight: 'auto',
//       marginTop: 0,
//       marginBottom: 0
//     };
//   }

//   render() {
//     const props = this.props,
//       state = this.state || {},
//       mousePosition = state.mousePosition || {},
//       viewportSize = state.viewport || {},
//       formLayoutSize = state.formLayout || this.props.form,
//       unitSize = this.props.unitSize * this.props.scale,
//       formLayoutWidth = formLayoutSize.width,
//       formLayoutHeight = formLayoutSize.height,
//       viewportScrollY = viewportSize.scrollY || 0,
//       viewportScrollX = viewportSize.scrollX || 0;

//     return (
//       <div className="row study-metadata-editor-layout">
//         <Ruler
//           position="top"
//           containerSize={formLayoutWidth}
//           viewportOffset={viewportScrollX}
//           formSize={this.state.form.width}
//           unitSize={unitSize}
//         />

//         <Ruler
//           position="left"
//           containerSize={formLayoutHeight}
//           viewportOffset={viewportScrollY}
//           formSize={this.state.form.height}
//           unitSize={unitSize}
//         />

//         <div className="form-viewport" ref={refEl => (this.viewportEl = refEl)} onMouseMove={this.mouseMoveHandler.bind(this)}>
//           <div className="form-layout" style={this.getContainerStyle()} ref={ref => (this.layoutEl = ref)}>
//             <div className="form" style={this.getFormStyle()} />
//           </div>
//         </div>

//         <StatusPanel mousePosition={mousePosition} {...props} />
//       </div>
//     );
//   }
// }

// // Wire up the React component to the Redux store
// export default connect(
//   (state: ApplicationState) => state.studyMetadataFormEditor, // Selects which state properties are merged into the component's props
//   actionCreators // Selects which action creators are merged into the component's props
// )(StudyMetadataFormEditor);



export default () => {
  const p = { x: 50, y: 120 };
  return (
    <Layout>
      {/* <Ruler position="left" containerSize={400} formSize={300} unitSize={10} viewportOffset={0} size={20} />
      <Ruler position="top" containerSize={500} formSize={300} unitSize={10} viewportOffset={0} size={20} /> */}
      {/* <StatusPanel mousePosition={p} scale={1} zoomIn={null} zoomOut={null} /> */}
      <Ruler1 width={1000} height={20} />
    </Layout>
  );
};

const Layout = styled.div`
  position: absolute;
  left: 200px;
  top: 0;
  width: 500px;
  height: 400px;
`;
