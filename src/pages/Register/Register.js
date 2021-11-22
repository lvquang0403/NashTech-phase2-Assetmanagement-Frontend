import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
	const [info, setInfo] = useState({
		username: "",
		password: "",
		repassword: "",
		email: "",
		dob: "",
		firstname: "",
		lastname: "",
		phone: "",
		gender: 1
	});
	return (
		<div>
			<div className="flex flex-column mx-auto bg-white w-25 p-3">
				<p class="h3 text-g">Register</p>
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
				<div className="flex flex-column mt-2">
					<label className="form-label text-secondary" htmlFor="password">
						Re-password
					</label>
					<input
						class="form-control"
						onChange={(e) => setInfo({ ...info, repassword: e.target.value })}
						type="password"
						value={info.repassword}
						id="password"
					/>
				</div>
				<div className="flex flex-column mt-2">
					<label className="form-label text-secondary" htmlFor="email">
						Email
					</label>
					<input
						class="form-control"
						onChange={(e) => setInfo({ ...info, email: e.target.value })}
						type="email"
						value={info.email}
						id="email"
					/>
				</div>
				<div className="flex flex-column mt-2">
					<label className="form-label text-secondary" htmlFor="phone">
						Phone
					</label>
					<input
						class="form-control"
						onChange={(e) => setInfo({ ...info, phone: e.target.value })}
						type="text"
						value={info.phone}
						id="phone"
					/>
				</div>
				<div className="flex flex-column mt-2">
					<label className="form-label text-secondary" htmlFor="gender">
						Gender
					</label>
					<select
						className="form-select"
						value={info.gender}
						onChange={(e) => setInfo({ ...info, gender: e.target.value })}
					>
						<option value="1">Man</option>
						<option value="0">Women</option>
					</select>
				</div>
				<div className="mt-3">
					<button className="ms-3 btn btn-danger">Register</button>
				</div>
			</div>
		</div>
	);
};

export default Register;
