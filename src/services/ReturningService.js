import axiosClient from "./AxiosCilent";
const API_BASE_URL = `api/returns`;

class ReturningService {
  getAllReturningRequests(query) {
    return axiosClient.get(`${API_BASE_URL}?${query}`);
  }
}

export default new ReturningService();
