import { hooks as metamaskHook, metaMask as metaMaskConnector } from "connectors/metaMask";
import { hooks as walletConnectHook, walletConnect as walletConnectConnector } from "connectors/walletConnect";
import { hooks as coinbaseHook, coinbaseWallet as coinbaseWalletConnector } from 'connectors/coinbaseWallet';

const SUPPORTED_WALLET = {
  METAMASK: {
    hooks: metamaskHook,
    connector: metaMaskConnector,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    hooks: walletConnectHook,
    connector: walletConnectConnector,
    name: 'WalletConnect',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  COINBASE: {
    hooks: coinbaseHook,
    connector: coinbaseWalletConnector,
    name: 'Coinbase',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  }
}

export { SUPPORTED_WALLET }