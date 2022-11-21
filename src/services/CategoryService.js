import axios from "axios";
const API_BASE_URL = `https://rookie06assetmanagement.azurewebsites.net/api/categories`;


class CategoryService {
    getAllCategories(){
        return axios.get(`${API_BASE_URL}`);
    }

    getAllCategoriesName(){
        return axios.get(`${API_BASE_URL}`);
    }

    insert(prefix, name){
        return axios.post(`${API_BASE_URL}`,{
            id: prefix,
            name:name
        });
    }
}

export default new CategoryService();