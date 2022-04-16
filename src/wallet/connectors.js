import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

const ETH = 1;
const AVAX = 43114;
const FUJI = 43113;
const SUPPORTED_IDS = [ETH, AVAX, FUJI];

const injected = new InjectedConnector({
	supportedChainIds: SUPPORTED_IDS,
});

const NETWORK_URLS = {
	[ETH]: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
	[AVAX]: "https://api.avax.network/ext/bc/C/rpc",
	[FUJI]: "https://api.avax-test.network/ext/bc/C/rpc",
};

const walletconnect = new WalletConnectConnector({
	supportedChainIds: SUPPORTED_IDS,
	rpc: NETWORK_URLS,
	bridge: "https://bridge.walletconnect.org",
	qrcode: true,
});

export const connectors = {
	injected: injected,
	walletConnect: walletconnect,
};

export const connectorType = {
	injected: "injected",
	walletconnect: "walletconnect",
};
