import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import ReactDOM from "react-dom";
import "react-notifications-component/dist/theme.css";
import { Provider } from "react-redux";
import Web3 from "web3";
import App from "./App";
import "./index.css";
import store from "./redux/store";

function getLibrary(provider) {
	return new Web3(provider);
}

ReactDOM.render(
	<React.StrictMode>
		<Web3ReactProvider getLibrary={getLibrary}>
			<Provider store={store}>
				<App />
			</Provider>
		</Web3ReactProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
