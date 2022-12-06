import formatDate from "./formatDate";

const validateAssetInsert = {
    name(name){
        if(name === null || name === undefined){
            return "This is a required field"
        }
        if( name.trim() === ""){
            return "This is a required field"
        }
        if (name.length > 50 ) {
            return 'name is too long, max 50 characters';
        }
        let regex = /[`^;:'"\\,./!@#$%&*()_+=|<>?{}[\]~]/g;
        let regex2 = /[áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/
        let character= /^[-0-9a-zA-Z\s]+$/;
        
        if(!character.test(name)){
            return 'Cannot special characters';
        }
        if (regex.test(name)) {
            return 'Cannot special characters';
        }
        if (regex2.test(name.toLocaleLowerCase())) {
            return 'Do not use Vietnamese accents';
        }
        return "success";
    },

    specification(specification){
        
        if(specification === null || specification === undefined){
            return "This is a required field"
        }
        if(specification.trim() === '' ){
            return "This is a required field"
        }
        if (specification.length > 500 ) {
            return 'name is too long, max 500 characters';
        }
        let character= /^[-0-9a-zA-Z\sáàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ`^'"\\,;:./!@#$%&*()_+=|<>?{}[\]~]+$/;
        if(!character.test(specification)){
            return 'Cannot special characters';
        }
        return "success";
    },

    installedDate(installedDate){
        let now = new Date();
        let newInstalledDate = new Date(installedDate);
        if(installedDate === null || installedDate === undefined){
            return "This is a required field"
        }
        if(Number.isNaN(newInstalledDate.getDay())){
            return "this day does not exist"
        }
        if((now.getFullYear() - newInstalledDate.getFullYear()) > 100){
            return "Invalid date"
        }
        if(formatDate(now)===formatDate(installedDate)){
            return "success";
        }
        if(now.getTime() <  newInstalledDate.getTime()){
            return "Select a date in the past or present"
        }
        return "success";
    }
}


export default validateAssetInsert;