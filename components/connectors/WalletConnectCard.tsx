import { useEffect } from "react";
import { hooks, walletConnect } from "../../connectors/walletConnect";
import { Accounts } from "../Accounts";
import { Card } from "../Card";
import { Chain } from "../Chain";
import { ConnectWithSelect } from "../ConnectWithSelect";
import { Status } from "../Status";
import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useERC20Contract } from "hooks/useContract";
import { MaxUint256 } from "@ethersproject/constants";
import { UNISWAP_ROUTER3_V2 } from "constants/contracts";
import { USDC } from "constants/tokens";
import { SupportedChainId } from "constants/chains";

const {
  useChainId,
  useAccounts,
  useIsActive,
  useProvider,
  useENSNames
//   useWeb3React
} = hooks;

export default function WalletConnectCard() {
  const chainId = useChainId();
  const accounts = useAccounts();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);
  const USDCAddress = USDC[chainId as SupportedChainId]?.address;
  const USDCContract = useERC20Contract(USDCAddress);

  //   const web3Provider = useWeb3React(provider);
  const { library, account } = useActiveWeb3React();
  const handleSendTransactionWithActiveConnector = () => {
    const approveData = USDCContract.interface.encodeFunctionData(
      "approve",
      [UNISWAP_ROUTER3_V2, MaxUint256]
    );
    library.getSigner().sendTransaction({
      from: account,
      to: USDCAddress,
      data: approveData
    });
  };

  // attempt to connect eagerly on mount
  useEffect(() => {
    void walletConnect.connectEagerly();
  }, []);

  return (
    <Card>
      <div>
        <b>WalletConnect</b>
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
        connector={walletConnect}
        chainId={chainId}
        isActive={isActive} />
      <button onClick={handleSendTransactionWithActiveConnector}>
				Send with Active Connector
      </button>
      <button>
				Send with WalletConnect
      </button>
    </Card>
  );
}
