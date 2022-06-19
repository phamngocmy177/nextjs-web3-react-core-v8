import { getPriorityConnector } from '@web3-react/core'
import { hooks, metaMask } from 'connectors/metaMask'
import type { Connector } from '@web3-react/types';
import { Web3Provider } from '@ethersproject/providers';

// TODO: Saved current connector to local storage and init here
export default function useActiveWeb3React(): ({
        connector: Connector;
        library: Web3Provider | undefined;
        chainId: number | undefined;
        account: string | undefined;
        active: boolean;
        error: Error | undefined;
}) {
    const priorityConnector = getPriorityConnector([metaMask, hooks]);
    const priorityProvider = priorityConnector.usePriorityProvider()
    const priorityWeb3React = priorityConnector.usePriorityWeb3React(priorityProvider)
    return priorityWeb3React
  }
  