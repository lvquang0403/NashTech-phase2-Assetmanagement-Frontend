import axios from "axios";

const API_BASE_URL = `https://rookie06assetmanagement.azurewebsites.net/api/users`;


class UserService {
    getAllUsers(query) {
        return axios.get(`${API_BASE_URL}?${query}`);
    }

    createUser(user, locationId) {
        user.roleId = parseInt(user.roleId)
        user.locationId = locationId
        return axios.post(API_BASE_URL, user)
    }

    getById(userId) {
        return axios.get(`${API_BASE_URL}/${userId}`)
    }
    getUserById(id) {
        return axios.get(`${API_BASE_URL}/${id}`);
    }

    updateById(user, userId) {
        return axios.put(`${API_BASE_URL}/${userId}`, user)
    }
}

export default new UserService();