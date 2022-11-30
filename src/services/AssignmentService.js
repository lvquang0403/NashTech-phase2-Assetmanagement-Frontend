import axiosClient from "./AxiosCilent";
const API_BASE_URL = `api/assignments`;

class AssignmentService {
  s;
  getAllAssignments(query) {
    return axiosClient.get(`${API_BASE_URL}?${query}`);
  }

  getAssetById(id) {
    return axiosClient.get(`${API_BASE_URL}/${id}`);
  }

  getAllStates() {
    return axiosClient.get(`${API_BASE_URL}/states`);
  }
}

export default new AssignmentService();
