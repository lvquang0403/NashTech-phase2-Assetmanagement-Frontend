import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLogin } from "../../api/getLogin";
import { useHistory } from "react-router-dom";
import { Alert, Form } from "react-bootstrap";
const Login = () => {
	let history = useHistory();
	const [info, setInfo] = useState({
		username: "",
		password: ""
	});
	const [isFilled, setIsFilled] = useState(false);
	const [isInvalid, setIsInvalid] = useState(false);

	const handleLogin = async () => {
		let data = await getLogin(info);
		if (data == null) {
			setIsInvalid(true);
		} else if (data.message === "SUCCESS_LOGIN_USER") {
			localStorage.setItem("jwtToken", data.data.token);
			localStorage.setItem("username", data.data.username);
			localStorage.setItem("refreshToken", data.data.refreshToken);
			localStorage.setItem("email", data.data.email);
			setIsInvalid(false);
			history.push("/home");
		}
	};

	const handleInput = (info) => {
		if (info.username !== "" && info.password !== "") {
			setIsFilled(true);
		} else if (info.username === "" || info.password === "") {
			setIsFilled(false);
		}
	};

	useEffect(() => {
		handleInput(info);
	}, [info]);

	return (
		<div className="flex text-start d-grid">
			<div className="flex flex-column mx-auto bg-white p-3 col-4 mt-5">
				<p class="h3 text-secondary text-center">Log in</p>
				<Form.Group className="mt-3">
					<Form.Label className="form-label text-secondary" htmlFor="username">
						Username
					</Form.Label>
					<Form.Control
						onChange={(e) => {
							setInfo({ ...info, username: e.target.value });
						}}
						type="text"
						value={info.username}
						id="username"
					/>
				</Form.Group>
				<Form.Group className="flex flex-column mt-2">
					<Form.Label className="form-label text-secondary" htmlFor="password">
						Password
					</Form.Label>
					<Form.Control
						onChange={(e) => {
							setInfo({ ...info, password: e.target.value });
						}}
						type="password"
						value={info.password}
						id="password"
					/>
				</Form.Group>
				<Alert
					class={`alert alert-danger my-2 ${isInvalid ? "" : "d-none"}`}
					role="alert"
				>
					Username or password is incorrect. Please try again
				</Alert>
				<div className="d-grid mt-3">
					{isFilled ? (
						<button
							className="col-4 offset-4 btn btn-danger"
							onClick={() => handleLogin()}
						>
							Log in
						</button>
					) : (
						<button className="col-4 offset-4 btn btn-danger" disabled>
							Log in
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
