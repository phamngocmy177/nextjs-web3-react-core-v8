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

const {
	useChainId,
	useAccounts,
	useError,
	useIsActivating,
	useIsActive,
	useProvider,
	useENSNames,
	useWeb3React,
} = hooks;

export default function MetaMaskCard() {
	const chainId = useChainId();
	const accounts = useAccounts();
	const error = useError();
	const isActivating = useIsActivating();

	const isActive = useIsActive();
	const provider = useProvider(chainId);
	const ENSNames = useENSNames(provider);
	const web3Provider = useWeb3React(provider);

	const USDCContract = useERC20Contract(USDC[chainId]);

	const handleSendTransaction = () => {
		const approveData = USDCContract.interface.encodeFunctionData(
			"approve",
			[UNISWAP_ROUTER3_V2, MaxUint256]
		);
		web3Provider.library.getSigner().sendTransaction({
			from: accounts[0],
			to: USDC[chainId],
			data: approveData,
		});
	};
	// attempt to connect eagerly on mount
	useEffect(() => {
		void metaMask.connectEagerly();
	}, []);

	return (
		<Card>
			<div>
				<b>MetaMask</b>
				<Status
					isActivating={isActivating}
					error={error}
					isActive={isActive}
				/>
				<div style={{ marginBottom: "1rem" }} />
				<Chain chainId={chainId} />
				<Accounts
					accounts={accounts}
					provider={provider}
					ENSNames={ENSNames}
				/>
			</div>
			<div style={{ marginBottom: "1rem" }} />
			<ConnectWithSelect
				connector={metaMask}
				chainId={chainId}
				isActivating={isActivating}
				error={error}
				isActive={isActive}
			/>
			<button onClick={handleSendTransaction}>Send Transaction</button>
		</Card>
	);
}
