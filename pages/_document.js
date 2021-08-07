import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          {/* <title>Galleryst</title> */}
          {/* Twitter */}
          {/* Facebook */}
          {/* Favicon */}
          <link rel='shortcut icon' type='image/x-icon' href='/favicon/favicon.ico' />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="manifest" href="/favicon/manifest.json" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />

          {/* GA added */}
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

          {/* GTM added */}
          {/* <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T47PMCH');`}}></script> */}

        </Head>
        <body>
          {/* <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T47PMCH" height="0" width="0" style="display:none;visibility:hidden"></iframe>`}}></noscript> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
