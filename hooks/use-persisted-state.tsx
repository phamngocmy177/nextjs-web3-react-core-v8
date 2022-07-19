
import createPersistedState from 'use-persisted-state';

const ACTIVE_CONNECTOR_KEY = 'active-connector';
const useActiveConnectorState = createPersistedState(ACTIVE_CONNECTOR_KEY);

const useActiveConnector = () => {
  const [activeConnector, setActiveConnector] = useActiveConnectorState('WALLET_CONNECT');

  return {
    activeConnector,
    setActiveConnector
  };
};

export default useActiveConnector;