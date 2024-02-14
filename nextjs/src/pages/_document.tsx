import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style = {{
          height: "100vh",display: "flex", flexDirection: "column",  backgroundColor: "rgba(50,150,255,0.2)"
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
