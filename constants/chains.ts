export enum SupportedChainId {
	// MAINNET = 1,
	ROPSTEN = 3,
	// RINKEBY = 4,
	// GOERLI = 5,
	// KOVAN = 42,

	// ARBITRUM_ONE = 42161,
	// ARBITRUM_RINKEBY = 421611,

	// OPTIMISM = 10,
	// OPTIMISTIC_KOVAN = 69,

	POLYGON = 137,
	// POLYGON_MUMBAI = 80001,
}

export const CHAIN_IDS_TO_NAMES = {
	// [SupportedChainId.MAINNET]: "mainnet",
	[SupportedChainId.ROPSTEN]: "ropsten",
	// [SupportedChainId.RINKEBY]: "rinkeby",
	// [SupportedChainId.GOERLI]: "goerli",
	// [SupportedChainId.KOVAN]: "kovan",
	[SupportedChainId.POLYGON]: "polygon",
	// [SupportedChainId.POLYGON_MUMBAI]: "polygon_mumbai",
	// [SupportedChainId.ARBITRUM_ONE]: "arbitrum",
	// [SupportedChainId.ARBITRUM_RINKEBY]: "arbitrum_rinkeby",
	// [SupportedChainId.OPTIMISM]: "optimism",
	// [SupportedChainId.OPTIMISTIC_KOVAN]: "optimistic_kovan",
};

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
	SupportedChainId
).filter((id) => typeof id === "number") as SupportedChainId[];
