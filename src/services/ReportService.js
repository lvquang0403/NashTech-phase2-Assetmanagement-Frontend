import axiosClient from "./AxiosCilent";

const API_BASE_URL = `api/reports`;



class ReportService {
    getReports() {
        return axiosClient.get(`${API_BASE_URL}`)
    }
   
}

export default new ReportService();