import { Token } from "@uniswap/sdk-core";
import { SupportedChainId } from "./chains";

export const USDC: { [chainId in SupportedChainId]: Token } = {
	[SupportedChainId.POLYGON]: new Token(
		SupportedChainId.POLYGON,
		"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
		6,
		"USDC",
		"USD Coin (PoS)"
	),
	[SupportedChainId.ROPSTEN]: new Token(
		SupportedChainId.POLYGON,
		"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
		6,
		"USDC",
		"USD Coin (PoS)"
	),
};
