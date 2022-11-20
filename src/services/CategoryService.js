import axios from "axios";
const API_BASE_URL = `https://rookie06assetmanagement.azurewebsites.net/categories`;


class CategoryService {
    getAllCategories(){
        return axios.get(`${API_BASE_URL}`);
    }
}

export default new CategoryService();