import formatDate from "./formatDate";

const validateAssignmentCreateUpdate = {
    user(user){
        if(user){
            return "success";
        }
        return "This is a required field";
    },
    asset(asset){
        if(asset){
            return "success";
        }
        return "This is a required field";
    },

    note(note){
        if(note.trim()===''){
            return 'success';
        }
        if (note.length > 500 ) {
            return 'name is too long, max 500 characters';
        }
        let character= /^[-0-9a-zA-Z\sáàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ`^'"\\,.;:/!@#$%&*()_+=|<>?{}[\]~]+$/;
        if(!character.test(note)){
            return 'Cannot special characters';
        }
        return "success";
    },

    assignedDate(assignedDate){
        let now = new Date();
        if(assignedDate === null || assignedDate === undefined){
            return "This is a required field"
        }
        let newAssignedDate = new Date(assignedDate);
        
        if(Number.isNaN(newAssignedDate.getDay())){
            return "this day does not exist"
        }
        if((newAssignedDate.getFullYear() - now.getFullYear()) > 100){
            return "Invalid date"
        }
        if(formatDate(now)===formatDate(newAssignedDate)){
            return "success";
        }
        if(now.getTime() >  newAssignedDate.getTime()){
            return "Select a date in the present or future"
        }
        
        return "success";
    }
}


export default validateAssignmentCreateUpdate;