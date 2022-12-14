import axiosClient from "./AxiosCilent";

const API_BASE_URL = `api/reports`;



class ReportService {
    getReports(locationId) {
        return axiosClient.get(`${API_BASE_URL}?locationId=${locationId}`)
    }
   
}

export default new ReportService();