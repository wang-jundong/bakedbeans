import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ModalDialog from "../elements/ModalDialog";
import Home from "../pages/home";

const AppRoutes = () => {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="*" element={<Home />} />
			</Routes>
			<ModalDialog />
		</Router>
	);
};

export default AppRoutes;
