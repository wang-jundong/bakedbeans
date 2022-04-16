import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { ReactNotifications } from "react-notifications-component";
import AppRoutes from "./components/routes";
import { getProvider } from "./components/utils/StorageUtil";
import { connectors } from "./wallet/connectors";

const App = () => {
	const { library, chainId, account, activate, deactivate, active } =
		useWeb3React();

	useEffect(() => {
		const provider = getProvider();
		if (provider) activate(connectors[provider]);
	}, []);

	return (
		<div>
			<ReactNotifications />
			<AppRoutes />
		</div>
	);
};

export default App;
