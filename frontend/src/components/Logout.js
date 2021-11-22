import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { getLogout } from "../api/getLogout";
import { useHistory } from "react-router-dom";
const Logout = () => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const token =({
		accessToken: localStorage.getItem("jwtToken"),
		refreshToken: localStorage.getItem("refreshToken")
	});

	let history = useHistory();

	const handleLogout = async () => {
		let data = await getLogout(token);
		if (data.message === "SUCCESS_LOGOUT_USER") {
			localStorage.removeItem("jwtToken");
			localStorage.removeItem("refreshToken");
			history.push("/login");
		}
	};

	return (
		<>
			<Button variant="default" onClick={() => handleShow()}>
				Log out
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						<p class="h3 text-danger">Are you sure</p>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>Do you want to log out?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => handleClose()}>
						Cancel
					</Button>
					<Button variant="danger" onClick={() => handleLogout()}>
						Log out
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Logout;
