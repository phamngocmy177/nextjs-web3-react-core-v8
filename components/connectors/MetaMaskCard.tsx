import { useEffect } from "react";
import { hooks, metaMask } from "../../connectors/metaMask";
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
import useActiveWeb3React from "hooks/useActiveWeb3React";

const {
  useChainId,
  useAccounts,
  useIsActive,
  useProvider,
  useENSNames
} = hooks;

export default function MetaMaskCard() {
  const chainId = useChainId();
  const accounts = useAccounts();

  const isActive = useIsActive();
  const provider = useProvider(chainId);
  const ENSNames = useENSNames(provider);
  //   const web3Provider = useWeb3React(provider);
  const USDCAddress = USDC[chainId as SupportedChainId]?.address;
  const USDCContract = useERC20Contract(USDCAddress);
  const context = useActiveWeb3React();

  const handleSendTransaction = () => {
    const approveData = USDCContract.interface.encodeFunctionData(
      "approve",
      [UNISWAP_ROUTER3_V2, MaxUint256]
    );
    context.library.getSigner().sendTransaction({
      from: accounts[0],
      to: USDCAddress,
      data: approveData
    });
  };
  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly();
  }, []);

  return (
    <Card>
      <div>
        <span className='font-bold'>MetaMask</span>
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
        connector={metaMask}
        chainId={chainId}
        isActive={isActive} />
      <button onClick={handleSendTransaction}>Send Transaction</button>
    </Card>
  );
}
