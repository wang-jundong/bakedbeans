const networks = {
	polygon: {
		chainId: `0x${Number(137).toString(16)}`,
		chainName: "Polygon Mainnet",
		nativeCurrency: {
			name: "MATIC",
			symbol: "MATIC",
			decimals: 18,
		},
		rpcUrls: ["https://polygon-rpc.com/"],
		blockExplorerUrls: ["https://polygonscan.com/"],
	},
	bsc: {
		chainId: `0x${Number(56).toString(16)}`,
		chainName: "Binance Smart Chain Mainnet",
		nativeCurrency: {
			name: "Binance Chain Native Token",
			symbol: "BNB",
			decimals: 18,
		},
		rpcUrls: [
			"https://bsc-dataseed1.binance.org",
			"https://bsc-dataseed2.binance.org",
			"https://bsc-dataseed3.binance.org",
			"https://bsc-dataseed4.binance.org",
			"https://bsc-dataseed1.defibit.io",
			"https://bsc-dataseed2.defibit.io",
			"https://bsc-dataseed3.defibit.io",
			"https://bsc-dataseed4.defibit.io",
			"https://bsc-dataseed1.ninicoin.io",
			"https://bsc-dataseed2.ninicoin.io",
			"https://bsc-dataseed3.ninicoin.io",
			"https://bsc-dataseed4.ninicoin.io",
			"wss://bsc-ws-node.nariox.org",
		],
		blockExplorerUrls: ["https://bscscan.com"],
	},
	avax: {
		chainId: `0x${Number(43114).toString(16)}`,
		chainName: "Avalanche Mainnet C-Chain",
		nativeCurrency: {
			name: "Avalanche",
			symbol: "AVAX",
			decimals: 18,
		},
		rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
		blockExplorerUrls: ["https://snowtrace.io/"],
	},
	fuji: {
		chainId: `0x${Number(43113).toString(16)}`,
		chainName: "Avalanche Testnet C-Chain",
		nativeCurrency: {
			name: "Avalanche",
			symbol: "AVAX",
			decimals: 18,
		},
		rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
		blockExplorerUrls: ["https://testnet.snowtrace.io/"],
	},
};

export const changeNetwork = async (networkName) => {
	try {
		if (!window.ethereum) throw new Error("No crypto wallet found");
		await window.ethereum.request({
			method: "wallet_addEthereumChain",
			params: [
				{
					...networks[networkName],
				},
			],
		});
	} catch (err) {
		console.log(err.message);
	}
};
