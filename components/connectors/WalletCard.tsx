import { useEffect } from "react";
import { Accounts } from "../Accounts";
import { Card } from "../Card";
import { Chain } from "../Chain";
import { ConnectWithSelect } from "../ConnectWithSelect";
import { Status } from "../Status";
import { useERC20Contract } from "hooks/useContract";
import { MaxUint256 } from "@ethersproject/constants";
import { UNISWAP_ROUTER3_V2 } from "constants/contracts";
import { USDC } from "constants/tokens";
import { SupportedChainId } from "constants/chains";
import useActiveConnector from "hooks/usePersistedState";

export default function WalletCard({
  hooks,
  connector,
  wallet,
  walletId
}) {

  const {
    useChainId,
    useAccounts,
    useIsActive,
    useProvider,
    useENSNames
  } = hooks;
  
  const chainId = useChainId();
  const accounts = useAccounts();
  const { setActiveConnector } = useActiveConnector()
  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const USDCAddress = USDC[chainId as SupportedChainId]?.address;
  const USDCContract = useERC20Contract(USDCAddress);

  const handleSendTransactionWithWalletConnect = () => {
    const approveData = USDCContract.interface.encodeFunctionData(
      "approve",
      [UNISWAP_ROUTER3_V2, MaxUint256]
    );
    provider.getSigner().sendTransaction({
      from: accounts[0],
      to: USDCAddress,
      data: approveData
    });
  };
  const setActive = () => {
    setActiveConnector(walletId)
  }
  // attempt to connect eagerly on mount
  useEffect(() => {
    void connector.connectEagerly();
  }, [connector]);

  return (
    <Card>
      <div>
        <b>{wallet.name}</b>
        <Status
          isActive={isActive} />
        <div style={{ marginBottom: "1rem" }} />
        <Chain chainId={chainId} />
        <Accounts
          accounts={accounts}
          provider={provider}
          ENSNames={ENSNames} />
      </div>
      <div style={{ marginBottom: "1rem" }} />
      <ConnectWithSelect
        connector={connector}
        chainId={chainId}
        isActive={isActive} />
      <button onClick={setActive}>Set Active</button>
      <button onClick={handleSendTransactionWithWalletConnect}>
		Send with {wallet.name}
      </button>
    </Card>
  );
}
