import axiosClient from "./AxiosCilent";
const API_BASE_URL = `api/returning`;

class RequestReturnService {

  create({ assignmentId, assignTo, assetId, assignedDate, note }) {
    return axiosClient.post(`${API_BASE_URL}`, {
      assignBy: assignmentId,
      requestTo: assignTo,
    });
  }

}

export default new RequestReturnService();
