import axios from "axios";
const API_BASE_URL = `https://rookie06assetmanagement.azurewebsites.net/api/assets`;


class AssetService {
    getAllAssets(query) {
        // console.log(`${API_BASE_URL}?${query}`);
        return axios.get(`${API_BASE_URL}?${query}`);
    }

    getAssetById(id) {
        // console.log(`${API_BASE_URL}?${query}`);
        return axios.get(`${API_BASE_URL}/${id}`);
    }


    getAllStates() {
        return axios.get(`${API_BASE_URL}/states`);
    }

}

export default new AssetService();