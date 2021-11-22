import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLogin } from "../../api/getLogin";
import { useHistory } from "react-router-dom";
const Login = () => {
	let history = useHistory();
	const [info, setInfo] = useState({
		username: "",
		password: ""
	});
	const [isInvalid, setIsInvalid] = useState(false);

	const handleLogin = async () => {
		let data = await getLogin(info);
		if (data == null) {
			setIsInvalid(true);
		} else if (data.message === "SUCCESS_LOGIN_USER") {
			localStorage.setItem("jwtToken", data.data.token);
			localStorage.setItem("username",data.data.username);
			localStorage.setItem("refreshToken",data.data.refreshToken);
			localStorage.setItem("email",data.data.email);
			setIsInvalid(false);
			history.push("/home");
		}
	};

	return (
		<div className="flex text-start d-grid">
			<div className="flex flex-column mx-auto bg-white p-3 col-4">
				<p class="h3 text-secondary text-center">Log in</p>
				<div>
					<label className="form-label text-secondary" htmlFor="username">
						Username
					</label>
					<input
						class="form-control"
						onChange={(e) => setInfo({ ...info, username: e.target.value })}
						type="text"
						value={info.username}
						id="username"
					/>
				</div>
				<div className="flex flex-column mt-2">
					<label className="form-label text-secondary" htmlFor="password">
						Password
					</label>
					<input
						class="form-control"
						onChange={(e) => setInfo({ ...info, password: e.target.value })}
						type="password"
						value={info.password}
						id="password"
					/>
				</div>
				<div
					class={`alert alert-danger my-2 ${isInvalid ? "" : "d-none"}`}
					role="alert"
				>
					You have entered an invalid username or password
				</div>
				<div className="d-grid mt-3" onClick={() => handleLogin()}>
					<button className="col-4 offset-4 btn btn-danger">Log in</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
