import axios from "axios";

export const getLogin = async (formData) => {
	let url =
		process.env.REACT_APP_ENV.trim() === "dev"
			? process.env.REACT_APP_DEV_URL
			: process.env.REACT_APP_PROD_URL;

	url += "/auth/login";
	let data;
	let response = await axios
		.post(url, {
			username: formData.username,
			password: formData.password
		})
		.then((res) => {
			data = res.data;
		})
		.catch((e) => {
			data = null;
		});
	return data;
};
