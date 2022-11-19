import axios from "axios";
const API_BASE_URL = `${process.env.REACT_APP_API_URL}/users`;


class UserService {
    getAllUsers(query){
        return axios.get(`${API_BASE_URL}?${query}`);
    }

    getUserById(id){
        return axios.get(`${API_BASE_URL}/${id}`);
    }
}

export default new UserService();