const validateCategoryInsert = {
    name(name){
        if(name === null || name === undefined){
            return "cannot be left blank"
        }
        if( name.trim() === ""){
            return "cannot be left blank"
        }
        if (name.length > 50 ) {
            return 'max 50 characters';
        }
        let regex = /[!@#$%&*()_+=|<>?{}~\][]/g;
        let regex2 = /[áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/
        if (regex.test(name)) {
            return 'Cannot special characters';
        }
        if (regex2.test(name)) {
            return 'Do not use Vietnamese accents';
        }
        return "success";
    },

    prefix(prefix){
        if(prefix === null || prefix === undefined){
            return "cannot be left blank"
        }
        if (prefix.trim() === '') {
            return 'cannot be left blank';
        }
        if (prefix.trim().length  !== 2 ) {
            return 'prefix only 2 characters';
        }
        let regex = /[!@#$%&*()_+=|<>?{}~\][]/g;
        let regex2 = /[áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]/
        if (regex.test(prefix)) {
            return 'Cannot special characters';
        }
        if (regex2.test(prefix)) {
            return 'Do not use Vietnamese accents';
        }
        return "success";
    }
}


export default validateCategoryInsert;