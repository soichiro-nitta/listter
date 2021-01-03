/* eslint-disable @typescript-eslint/no-explicit-any */
import Document, { Head, Html, Main, NextScript } from 'next/document'
import * as React from 'react'

type Props = {}

class _Document extends Document<Props> {
  render(): React.ReactElement {
    return (
      <Html lang="ja">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;700&family=Syne:wght@500;700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default _Document
