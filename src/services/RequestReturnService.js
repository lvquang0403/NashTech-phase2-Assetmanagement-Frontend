import axiosClient from "./AxiosCilent";
const API_BASE_URL = `api/returns`;

class RequestReturnService {

  create({ assignmentId, assignTo, assetId, assignedDate, note }) {
    return axiosClient.post(`${API_BASE_URL}`, {
      assignBy: assignmentId,
      requestTo: assignTo,
    });
  }

  completeRequest(payload, returningId){
    return axiosClient.put(`${API_BASE_URL}/${returningId}`, payload)
  }
  cancelRequest(returningId){
    return axiosClient.delete(`${API_BASE_URL}/${returningId}`)
  }

}

export default new RequestReturnService();
