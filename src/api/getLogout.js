import axios from "axios";

export const getLogout = async (formData) => {
    let url =
        process.env.REACT_APP_ENV.trim() === "dev"
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL;

    url += "/auth/logout";
    let data;
    let respone = await axios
        .post(url,{ 
                accessToken : formData.accessToken,
                refreshToken: formData.refreshToken
            })
            .then((res) =>{
                data = res.data;
            })
            .catch((e) =>{
                data = null;
            });
    return data;

}