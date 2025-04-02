import { Html, Head, Main, NextScript } from "next/document";
import { bricolagegrotesque } from ".";


export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className={`antialiased ${bricolagegrotesque.className}`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
