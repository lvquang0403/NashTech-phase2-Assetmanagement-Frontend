import axiosClient from "./AxiosCilent";
const API_BASE_URL = `api/assignments`;

class AssignmentService {
  create({ assignBy, assignTo, assetId, assignedDate, note }) {
    return axiosClient.post(`${API_BASE_URL}`, {
      assignBy: assignBy,
      assignTo: assignTo,
      assetId: assetId,
      assignedDate: assignedDate,
      note: note,
    });
  }

  
  update({assignmentId, assignTo, assetId, assignedDate, note}){
    return axiosClient.put(`${API_BASE_URL}/${assignmentId}`,{
        assignTo: assignTo,
        assetId : assetId,
        assignedDate : assignedDate,
        note : note
    });
  } 

  delete(id){
    return axiosClient.delete(`${API_BASE_URL}/${id}`);
  }

  getAllAssignments(query) {
    return axiosClient.get(`${API_BASE_URL}?${query}`);
  }

  getAssignmentById(id) {
    return axiosClient.get(`${API_BASE_URL}/${id}`);
  }

  getUserAssignments(query, userID) {
    return axiosClient.get(`${API_BASE_URL}/user/${userID}?${query}`);
  }

  changeStateAssignment(assignmentId, state){
    console.log(state);
    return axiosClient.put(`${API_BASE_URL}/${assignmentId}/state`,{
        id: assignmentId,
        state : state,
    });
  } 
}

export default new AssignmentService();
