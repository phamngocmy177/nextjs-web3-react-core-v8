
import Layout from 'parts/layout';
import type { AppPropsWithLayout } from 'types/general.d';
import Head from 'next/head';
import 'styles/globals.css';
import { ActiveWeb3Provider } from 'hooks/useActiveWeb3React';
import useActiveWeb3Context from 'hooks/useActiveWeb3Context';

const MyApp = ({
  Component,
  pageProps
}: AppPropsWithLayout): JSX.Element => {
  const getLayout = Component.getLayout ?? (page => page);
 
  const { priorityProvider } = useActiveWeb3Context()

  return (
    <>
      <Head>
        <title>Wallet v8</title>
      </Head>
      <Layout>
        <ActiveWeb3Provider
          provider={priorityProvider}>
          {getLayout(<Component {...pageProps} />)}
        </ActiveWeb3Provider>
      </Layout>      
    </>
  )
}

export default MyApp;