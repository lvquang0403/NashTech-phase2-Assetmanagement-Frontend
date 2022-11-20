import axios from "axios";

const API_BASE_URL = `https://rookie06assetmanagement.azurewebsites.net/roles`;



class RoleService {
    getRoles() {
        return axios.get(`${API_BASE_URL}`)
    }
}

export default new RoleService();