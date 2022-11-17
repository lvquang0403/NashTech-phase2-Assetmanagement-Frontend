import axios from "axios";
const API_BASE_URL = `${process.env.REACT_APP_API_URL}/assets`;


class AssetService {
    getAllAssets(){
        return axios.get(`${API_BASE_URL}`);
    }
}

export default new AssetService();