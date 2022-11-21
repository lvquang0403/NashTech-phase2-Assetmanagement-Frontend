const validateAssetInsert = {
    name(name){
        if(name === null || name === undefined){
            return "cannot be left blank"
        }
        if( name.trim() === ""){
            return "cannot be left blank"
        }
        if (name.length > 50 ) {
            return 'name is too long, max 50 characters';
        }
        let regex = /[!@#$%&*()_+=|<>?{}[\]~]/g;
        let regex2 = /[áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/
        if (regex.test(name)) {
            return 'Cannot special characters';
        }
        if (regex2.test(name)) {
            return 'Do not use Vietnamese accents';
        }
        return "success";
    },

    specification(specification){
        if(specification === null || specification === undefined){
            return "cannot be left blank"
        }
        if (specification.length > 500 ) {
            return 'name is too long, max 500 characters';
        }
        return "success";
    },

    installedDate(installedDate){
        let now = new Date();
        let newInstalledDate = new Date(installedDate);
        if(installedDate === null || installedDate === undefined){
            return "cannot be left blank"
        }
        if(now.getTime() <  newInstalledDate.getTime()){
            return "Select a date in the past or present"
        }
        console.log(installedDate);
        if(Number.isNaN(newInstalledDate.getDay())){
            return "This month has no 31st day"
        }
        
        return "success";
    }
}


export default validateAssetInsert;