const validateReturningCreate = {
    requestById(requestById){
        if(requestById === null || requestById === undefined){
            alert("request sender id not found")
            return false;
        }
        if( requestById.trim() === ""){
            alert("request sender id not found")
            return false;
        }
        return true
    },

    assignmentId(assignmentId){
        if(assignmentId === null || assignmentId === undefined){
            alert("assignment id not found")
            return false;
        }
        return true;
    }

}


export default validateReturningCreate;