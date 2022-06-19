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

const USDC = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const UNISWAP_ROUTER3_V2 = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

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

export default function WalletConnectCard() {
	const chainId = useChainId();
	const accounts = useAccounts();
	const error = useError();
	const isActivating = useIsActivating();

	const isActive = useIsActive();

	const provider = useProvider();
	const ENSNames = useENSNames(provider);
	const USDCContract = useERC20Contract(USDC);
	const web3Provider = useWeb3React(provider);
	const { library, account } = useActiveWeb3React();
	const handleSendTransactionWithActiveConnector = () => {
		const approveData = USDCContract.interface.encodeFunctionData(
			"approve",
			[UNISWAP_ROUTER3_V2, MaxUint256]
		);
		library.getSigner().sendTransaction({
			from: account,
			to: USDC,
			data: approveData,
		});
	};
	const handleSendTransactionWithWalletConnect = () => {
		const approveData = USDCContract.interface.encodeFunctionData(
			"approve",
			[UNISWAP_ROUTER3_V2, MaxUint256]
		);
		web3Provider.library.getSigner().sendTransaction({
			from: accounts[0],
			to: USDC,
			data: approveData,
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
				connector={walletConnect}
				chainId={chainId}
				isActivating={isActivating}
				error={error}
				isActive={isActive}
			/>
			<button onClick={handleSendTransactionWithActiveConnector}>
				Send with Active Connector
			</button>
			<button onClick={handleSendTransactionWithWalletConnect}>
				Send with WalletConnect
			</button>
		</Card>
	);
}
