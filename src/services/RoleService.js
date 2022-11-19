import axios from "axios";

const API_URL = "http://localhost:8080/api/roles"

class RoleService {
    getRoles(){
        return axios.get(API_URL)
    }
}

export default new RoleService();