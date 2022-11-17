import axios from "axios";
const API_BASE_URL = `${process.env.REACT_APP_API_URL}/states`;


class StateService {
    getAllStates(){
        return axios.get(`${API_BASE_URL}`);
    }
}

export default new StateService();