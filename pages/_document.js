import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <title>Galleryst</title>
          {/* Twitter */}
          <meta name="twitter:card" content="summary" key="twcard" />
          <meta name="twitter:creator" content='@gallerystco' key="twhandle" />

          {/* Facebook */}
          <meta property="og:url" content="https://galleryst.co/" key="ogurl" />
          <meta name="twitter:image" property="og:image" content="https://koh-assets.s3-ap-southeast-1.amazonaws.com/galleryst/ogimage.png" key="ogimage" />
          <meta name="twitter:site" property="og:site_name" content="Galleryst" key="ogsitename" />
          <meta name="twitter:title" property="og:title" content="Galleryst" key="ogtitle" />
          <meta name="twitter:description" property="og:description" content="Explore NFTs from all platforms in one place." key="ogdesc" />
          {/* Favicon */}
          <link rel='shortcut icon' type='image/x-icon' href='/favicon/favicon.ico' />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="manifest" href="/favicon/manifest.json" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=G-YY6WQFZ9PK`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YY6WQFZ9PK', {
              page_path: window.location.pathname,
            });
          `,
            }}
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
