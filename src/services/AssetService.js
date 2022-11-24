import axiosClient from "./AxiosCilent";
const API_BASE_URL = `api/assets`;


class AssetService {
    getAllAssets(query) {
        return axiosClient.get(`${API_BASE_URL}?${query}`)
    }

    getAssetById(id) {
        return axiosClient.get(`${API_BASE_URL}/${id}`)
    }


    getAllStates() {
        return axiosClient.get(`${API_BASE_URL}/states`);
    }

    
    insert({name, specification, categoryId, state, locationId, installedDate}){
        return axiosClient.post(`${API_BASE_URL}`,{
            name : name,
            specification: specification,
            categoryId : categoryId,
            state : state,
            locationId : locationId,
            installedDate : installedDate
        });
    }

    update({id, name, specification, state,  installedDate}){
        return axiosClient.put(`${API_BASE_URL}/${id}`,{
            name : name,
            specification: specification,
            state : state,
            installedDate : installedDate
        });
    }

    checkCanDelete(id){
        return axiosClient.get(`${API_BASE_URL}/${id}/check-historical`);
    }
    deleteAssetById(id) {
        return axiosClient.delete(`${API_BASE_URL}/${id}`)
    }
}

export default new AssetService();