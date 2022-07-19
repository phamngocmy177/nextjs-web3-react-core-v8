import { getPriorityConnector } from '@web3-react/core'
import { SUPPORTED_WALLET } from 'constants/wallets';
import useActiveConnector from 'hooks/usePersistedState';

const useActiveWeb3Context = () => {
  const { activeConnector } = useActiveConnector();
  const activeWallet = SUPPORTED_WALLET[activeConnector];
  const priorityConnector = getPriorityConnector([activeWallet.connector, activeWallet.hooks]);
  const priorityProvider = priorityConnector.usePriorityProvider()

  return {
    activeWallet,
    priorityProvider
  }
}

export default useActiveWeb3Context;