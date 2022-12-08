import axios from "axios";

const API_BASE_URL = `https://rookie06assetmanagement.azurewebsites.net/api/login`;
// const API_BASE_URL = `http://localhost:8080/api/login`;

class AuthService {
  login(payload) {
    return axios.post(API_BASE_URL, payload);
  }
}

export default new AuthService();
