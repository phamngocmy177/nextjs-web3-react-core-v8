
import { ExternalProvider, JsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { initializeConnector, Web3ReactHooks } from '@web3-react/core'
import { EIP1193 } from '@web3-react/eip1193'
import { EMPTY } from '@web3-react/empty'
import { Actions, Connector, Provider as Eip1193Provider, Web3ReactStore } from '@web3-react/types'
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import JsonRpcConnector from 'connectors/JsonRpcConnector';

type Web3ContextType = {
    connector: Connector;
    library?: (JsonRpcProvider & { provider?: ExternalProvider; }) | Web3Provider;
    chainId?: ReturnType<Web3ReactHooks['useChainId']>;
    accounts?: ReturnType<Web3ReactHooks['useAccounts']>;
    account?: ReturnType<Web3ReactHooks['useAccount']>;
    active?: ReturnType<Web3ReactHooks['useIsActive']>;
    ensNames?: ReturnType<Web3ReactHooks['useENSNames']>;
    ensName?: ReturnType<Web3ReactHooks['useENSName']>;
  }

const EMPTY_CONNECTOR = initializeConnector(() => EMPTY)
const EMPTY_CONTEXT: Web3ContextType = { connector: EMPTY }

const Web3Context = createContext(EMPTY_CONTEXT)

function useActiveWeb3React() {
  return useContext(Web3Context)
}

function useConnector<T extends { new(actions: Actions, initializer: I): Connector; }, I>(
  Connector: T,
  initializer: I | undefined
) {
  const [connector, setConnector] = useState<[Connector, Web3ReactHooks, Web3ReactStore]>(EMPTY_CONNECTOR)
  useEffect(() => {

    if (initializer) {
      const [initConnector, hooks, store] = initializeConnector(actions => new Connector(actions, initializer))
      initConnector.activate()
      setConnector([initConnector, hooks, store])
    } else {
      setConnector(EMPTY_CONNECTOR)
    }

  }, [Connector, initializer, setConnector])
  return connector
}

interface ActiveWeb3ProviderProps {
    provider?: Eip1193Provider | JsonRpcProvider;
  }
 
export function ActiveWeb3Provider({
  provider,
  children
}: PropsWithChildren<ActiveWeb3ProviderProps>) {

  const Injected = useMemo(() => {
    if (provider) {
      if (JsonRpcProvider.isProvider(provider)) return JsonRpcConnector
      if (JsonRpcProvider.isProvider((provider as any).provider)) {
        throw new Error('Eip1193Bridge is experimental: pass your ethers Provider directly')
      }
    }
    return EIP1193
  }, [provider]) as { new (actions: Actions, initializer: typeof provider): Connector; }
  const injectedConnector = useConnector(Injected, provider)

  const [connector, hooks] =  injectedConnector ?? EMPTY_CONNECTOR
  const library = hooks.useProvider()
  
  // TODO(zzmp): walletconnect returns chainId as a number, so web3-react incorrectly parses it as hex.
  const [chainId, setChainId] = useState(hooks.useChainId())
  useEffect(() => {
    let stale = false
    library?.getNetwork().then(({ chainId }) => {
      if (!stale) {
        setChainId(chainId)
      }
    })
    return () => {
      stale = true
    }
  }, [library])
  
  const accounts = hooks.useAccounts()
  const account = hooks.useAccount()
  const active = hooks.useIsActive()
  const ensNames = hooks.useENSNames()
  const ensName = hooks.useENSName()
  
  const web3 = useMemo(() => {
    if (connector === EMPTY || !active) {
      return EMPTY_CONTEXT
    }
    return { connector, library, chainId, accounts, account, active, ensNames, ensName }
  }, [account, accounts, active, chainId, connector, ensName, ensNames, library])

  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>
} 

export default  useActiveWeb3React;