import { Route } from "react-router";
import ChangePass from "./components/ChangePassword";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./Home/Home";
function App() {
	return (
		<div>
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Route path="/home" component={Home} />
		</div>
	);
}

export default App;
