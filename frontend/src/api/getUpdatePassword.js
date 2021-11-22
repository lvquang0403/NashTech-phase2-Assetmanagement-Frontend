import axios from "axios"

export const getUpdatePass = async (formData) => {
    let url =
        process.env.REACT_APP_ENV.trim() === "dev"
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL;

    url += "/auth/updatePassword";
    let data;
    let respone = await axios
        .post(url, {
            username: formData.username,
            email: formData.email,
            password: formData.newPassword,
        }).then((res) => {
            data = res.data;
        }).catch((e) => {
            data = null;
        });

    return data;
}