import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store';
import styled from 'styled-components';
import Menu from 'components/Menu';

class Veljam extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render() {
    const { props } = this as any;
    const { Component, pageProps, store } = props;

    return (
      <Container>
        <Provider store={store}>
          <Viewport>
            <Left>
              <Menu />
            </Left>
            <Stretch>
              <Component {...pageProps} />
            </Stretch>
          </Viewport>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(Veljam));

const Viewport = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const Left = styled.div`
  flex: 0 0 150px;
`;

const Stretch = styled.div`
  flex: 1;
  overflow: auto;
`;
