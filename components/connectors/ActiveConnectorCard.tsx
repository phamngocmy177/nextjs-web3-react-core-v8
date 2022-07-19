
import { Accounts } from "../Accounts";
import { Card } from "../Card";
import { Chain } from "../Chain";
import { Status } from "../Status";
import { useERC20Contract } from "hooks/useContract";
import { MaxUint256 } from "@ethersproject/constants";
import { UNISWAP_ROUTER3_V2 } from "constants/contracts";
import { USDC } from "constants/tokens";
import { SupportedChainId } from "constants/chains";
import useActiveWeb3React from "hooks/useActiveWeb3React";

export default function ActiveConnectorCard() {
  const context = useActiveWeb3React();

  const { account, chainId, active, accounts, library: provider,ensNames } = context;
  const USDCAddress = USDC[chainId as SupportedChainId]?.address;
  const USDCContract = useERC20Contract(USDCAddress);

  const handleSendTransaction = () => {
    const approveData = USDCContract.interface.encodeFunctionData(
      "approve",
      [UNISWAP_ROUTER3_V2, MaxUint256]
    );
    context.library.getSigner().sendTransaction({
      from: account,
      to: USDCAddress,
      data: approveData
    });
  };

  return (
    <Card>
      <div>
        <span className='font-bold'>Active</span>
        <Status
          isActive={active} />
        <div style={{ marginBottom: "1rem" }} />
        <Chain chainId={chainId} />
        <Accounts
          accounts={accounts}
          provider={provider}
          ENSNames={ensNames} />
      </div>
      <div style={{ marginBottom: "1rem" }} />
      <button onClick={handleSendTransaction}>Send Transaction</button>
    </Card>
  );
}
