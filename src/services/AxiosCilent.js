import axios from "axios";

const API_BASE_URL = `https://rookie06assetmanagement.azurewebsites.net`;
// const API_BASE_URL = `http://localhost:8080`;

const getLocalToken = () => {
  if (window.sessionStorage.getItem("user")) {
    const userJson = window.sessionStorage.getItem("user");
    const token = JSON.parse(userJson).accessToken;
    return token;
  }
};

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${getLocalToken()}`;
  return request;
});

export default axiosClient;
