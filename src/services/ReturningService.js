import axiosClient from "./AxiosCilent";
const API_BASE_URL = `api/returns`;

class ReturningService {
  getAllReturningRequests(query) {
    return axiosClient.get(`${API_BASE_URL}?${query}`);
  }
  
  create({requestById, assignmentId}) {
    return axiosClient.post(`${API_BASE_URL}`, {
      requestById: requestById,
      assignmentId: assignmentId
    });
  }
}

export default new ReturningService();
