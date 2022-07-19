
import Layout from 'parts/layout';
import type { AppPropsWithLayout } from 'types/general.d';
import Head from 'next/head';
import 'styles/globals.css';
import { ActiveWeb3Provider } from 'hooks/useActiveWeb3React';
import { getPriorityConnector } from '@web3-react/core'
import { SUPPORTED_WALLET } from 'constants/wallets';
import useActiveConnector from 'hooks/use-persisted-state';

const MyApp = ({
  Component,
  pageProps
}: AppPropsWithLayout): JSX.Element => {
  const getLayout = Component.getLayout ?? (page => page);
  const { activeConnector } = useActiveConnector();
  const activeWallet = SUPPORTED_WALLET[activeConnector];
  const priorityConnector = getPriorityConnector([activeWallet.connector, activeWallet.hooks]);
  const priorityProvider = priorityConnector.usePriorityProvider()

  return (
    <>
      <Head>
        <title>Wallet v8</title>
      </Head>
      <Layout>
        <ActiveWeb3Provider
          provider={priorityProvider}
          jsonRpcEndpoint='https://mainnet.infura.io/v3/7571afdbb47944d3ac05c707a41b1032'>
          {getLayout(<Component {...pageProps} />)}
        </ActiveWeb3Provider>
      </Layout>      
    </>
  )
}

export default MyApp;