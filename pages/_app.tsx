
import Layout from 'parts/layout';
import type { AppPropsWithLayout } from 'types/general.d';
import Head from 'next/head';
import 'styles/globals.css';

const MyApp = ({
  Component,
  pageProps
}: AppPropsWithLayout): JSX.Element => {
  const getLayout = Component.getLayout ?? (page => page);
    
  return (
    <>
      <Head>
        <title>Wallet v8</title>
      </Head>
      <Layout>
        {getLayout(<Component {...pageProps} />)}
      </Layout>      
    </>
  )
}

export default MyApp;