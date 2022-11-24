import axiosClient from "./AxiosCilent";

const API_BASE_URL = `api/users`;


class UserService {
    getAllUsers(query) {
        return axiosClient.get(`${API_BASE_URL}?${query}`);
    }

    createUser(user, locationId) {
        user.roleId = parseInt(user.roleId)
        user.locationId = locationId
        // return axios.post(API_BASE_URL, user)
        return axiosClient.get("sadsadsad")
    }

    getById(userId) {
        return axiosClient.get(`${API_BASE_URL}/${userId}`)
    }
    getUserById(id) {
        return axiosClient.get(`${API_BASE_URL}/${id}`);
    }

    updateById(user, userId) {
        return axiosClient.put(`${API_BASE_URL}/${userId}`, user)
    }
}

export default new UserService();