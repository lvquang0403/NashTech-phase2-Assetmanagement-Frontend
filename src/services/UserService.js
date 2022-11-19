import axios from "axios";

const API_URL = "http://localhost:8080/api/users"
class UserService {

    createUser(user, locationId){
        user.roleId = parseInt(user.roleId)
        user.locationId = locationId
        console.log("call API", user);
        return axios.post(API_URL,user)
    }

    getById(userId) {
        return axios.get(`${API_URL}/${userId}`)
    }

    updateById(user, userId){
        console.log("call update API", user)
        console.log("call update API", userId)
        return axios.put(`${API_URL}/${userId}`,user)
    }
}

export default new UserService();