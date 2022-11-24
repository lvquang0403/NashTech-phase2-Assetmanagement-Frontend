import axiosClient from "./AxiosCilent";

const API_BASE_URL = `api/roles`;



class RoleService {
    getRoles() {
        return axiosClient.get(`${API_BASE_URL}`)
    }

    getRoleNames() {
        return axiosClient.get(`${API_BASE_URL}/name`)
    }
}

export default new RoleService();