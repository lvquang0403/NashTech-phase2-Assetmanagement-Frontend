import axiosClient from "./AxiosCilent";
const API_BASE_URL = `api/assignments`;


class AssignmentService {
   
    insert({assignBy, assignTo, assetId, assignedDate, note}){
        return axiosClient.post(`${API_BASE_URL}`,{
            assignBy : assignBy,
            assignTo: assignTo,
            assetId : assetId,
            assignedDate : assignedDate,
            note : note
        });
    }

}

export default new AssignmentService();