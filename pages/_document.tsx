import Document, { Head, Main, NextScript } from 'next/document';
import styled, { ServerStyleSheet } from 'styled-components';

export default class VeljamDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Veljam</title>
          {this.props.styleTags}
        </Head>
        <Body>
          <Main />
          <NextScript />
        </Body>
      </Html>
    );
  }
}

const Html = styled.html`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
`;

const Body = styled.body`
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;

  #__next {
    height: 100%;
    width: 100%;
  }
`;
