import CoinbaseWalletCard from '../components/connectors/CoinbaseWalletCard'
import MetaMaskCard from '../components/connectors/MetaMaskCard'
import NetworkCard from '../components/connectors/NetworkCard'
import WalletConnectCard from '../components/connectors/WalletConnectCard'

import 'styles/globals.css';

const MyApp = () => {
  return (
    <>
      <MetaMaskCard />
      <WalletConnectCard />
      <CoinbaseWalletCard />
      <NetworkCard />
    </>
  )
}

export default MyApp;