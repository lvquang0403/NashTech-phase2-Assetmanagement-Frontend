import axios from "axios";

const API_BASE_URL = `https://rookie06assetmanagement.azurewebsites.net/api/roles`;



class RoleService {
    getRoles() {
        return axios.get(`${API_BASE_URL}`)
    }

    getRoleNames() {
        return axios.get(`${API_BASE_URL}/name`)
    }
}

export default new RoleService();