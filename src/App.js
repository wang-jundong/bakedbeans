import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { ReactNotifications } from "react-notifications-component";
import { useDispatch } from "react-redux";
import AppRoutes from "./components/routes";
import { getProvider } from "./components/utils/StorageUtil";
import { ALERT_UPDATE_DATA, ALERT_UPDATE_OPEN } from "./redux/constants";
import { connectors } from "./wallet/connectors";
import { changeNetwork } from "./wallet/Network";

const App = () => {
	const dispatch = useDispatch();
	const { library, chainId, account, activate, deactivate, active } =
		useWeb3React();

	useEffect(() => {
		const provider = getProvider();
		if (provider) activate(connectors[provider]);
	}, []);

	useEffect(() => {
		if (window.ethereum) {
			// when first loading, check network
			window.ethereum
				.request({ method: "eth_chainId" })
				.then((chainId) => {
					checkIfAvaxNetwork(chainId);
				})
				.catch((err) => {
					console.log(err);
				});

			// when network changed, check network
			window.ethereum.on("chainChanged", (chainId) => {
				checkIfAvaxNetwork(chainId);
			});
		}
	}, []);

	const checkIfAvaxNetwork = (chainId) => {
		console.log("---chainid---", chainId);
		if (chainId !== "0xa869") {
			dispatch({ type: ALERT_UPDATE_OPEN, payload: true });
			dispatch({
				type: ALERT_UPDATE_DATA,
				payload: { severity: "error", message: "Wrong Network" },
			});
			changeNetwork("fuji");
		}
	};

	return (
		<div>
			<ReactNotifications />
			<AppRoutes />
		</div>
	);
};

export default App;
