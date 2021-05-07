import Document, { Html, Head, Main, NextScript } from 'next/document'

// const GTM_ID = '266974092'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* Open Graph */}
          <meta property="og:url" content="https://galleryst.co/" key="ogurl" />
          <meta property="og:image" content="https://koh-assets.s3-ap-southeast-1.amazonaws.com/galleryst/ogimage.png" key="ogimage" />
          <meta property="og:site_name" content="Galleryst" key="ogsitename" />
          <meta property="og:title" content="Galleryst" key="ogtitle" />
          <meta property="og:description" content="Our initial idea is to gather all the NFTs artworks from all the platforms, so you will have a place where you can always get updated of all the NFTs art from your favourite artists. We don’t know how far can our site will go, but we are believing that NFTs will change the way people appreciate and exchange art forever. If you have any cool ideas about NFTs feel free to ping us, we would love to hear your thoughts" key="ogdesc" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
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
