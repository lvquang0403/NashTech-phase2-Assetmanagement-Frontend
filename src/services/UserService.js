import axios from "axios";

const API_BASE_URL = `https://rookie06assetmanagement.azurewebsites.net/users`;


class UserService {
    getAllUsers(query) {
        return axios.get(`${API_BASE_URL}?${query}`);
    }

    createUser(user, locationId) {
        user.roleId = parseInt(user.roleId)
        user.locationId = locationId
        console.log("call API", user);
        return axios.post(API_BASE_URL, user)
    }

    getById(userId) {
        return axios.get(`${API_BASE_URL}/${userId}`)
    }
    getUserById(id) {
        return axios.get(`${API_BASE_URL}/${id}`);
    }

    updateById(user, userId) {
        console.log("call update API", user)
        console.log("call update API", userId)
        return axios.put(`${API_BASE_URL}/${userId}`, user)
    }
}

export default new UserService();