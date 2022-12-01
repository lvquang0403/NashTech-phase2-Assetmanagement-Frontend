import axiosClient from "./AxiosCilent";
const API_BASE_URL = `api/assignments`;

class AssignmentService {
  insert({ assignBy, assignTo, assetId, assignedDate, note }) {
    return axiosClient.post(`${API_BASE_URL}`, {
      assignBy: assignBy,
      assignTo: assignTo,
      assetId: assetId,
      assignedDate: assignedDate,
      note: note,
    });
  }

  getAllAssignments(query) {
    return axiosClient.get(`${API_BASE_URL}?${query}`);
  }

  getAssetById(id) {
    return axiosClient.get(`${API_BASE_URL}/${id}`);
  }

  getUserAssignments(query, userID) {
    return axiosClient.get(`${API_BASE_URL}/user/${userID}?${query}`);
  }
}

export default new AssignmentService();
