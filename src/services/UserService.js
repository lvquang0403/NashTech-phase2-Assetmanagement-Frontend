import axiosClient from "./AxiosCilent";

const API_BASE_URL = `api/users`;


class UserService {
    
    getAllUsers(query) {
        return axiosClient.get(`${API_BASE_URL}?${query}`);
    }
    createUser(user, locationId) {
        user.roleId = parseInt(user.roleId)
        user.locationId = parseInt(locationId)
        // return axios.post(API_BASE_URL, user)
        return axiosClient.post(`${API_BASE_URL}`,user)
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
    checkDisable(id) {
        return axiosClient.get(`${API_BASE_URL}/${id}/disable`)
    }
    disableUserById(id) {
        return axiosClient.delete(`${API_BASE_URL}/${id}`)
    }
    changePass(oldPass, newPass ) {
        return axiosClient.post(`${API_BASE_URL}/reset-password`, {
            oldPassword: oldPass,
            newPassword: newPass
        });
    }
    changePassFirst( newPass ) {
        return axiosClient.post(`${API_BASE_URL}/reset-password`, {
            newPassword: newPass
        });
    }
}

export default new UserService();