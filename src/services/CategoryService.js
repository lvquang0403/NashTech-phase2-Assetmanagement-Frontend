import axiosClient from "./AxiosCilent";
const API_BASE_URL = `api/categories`;


class CategoryService {
    getAllCategories(){
        return axiosClient.get(`${API_BASE_URL}`);
    }

    getAllCategoriesName(){
        return axiosClient.get(`${API_BASE_URL}/name`);
    }

    insert(prefix, name){
        return axiosClient.post(`${API_BASE_URL}`,{
            id: prefix,
            name:name
        });
    }
}

export default new CategoryService();