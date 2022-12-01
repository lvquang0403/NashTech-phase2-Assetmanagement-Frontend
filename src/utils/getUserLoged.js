const getUserLoged = ()=>{
    if(window.sessionStorage.getItem('user')){
        const userJson = window.sessionStorage.getItem('user')
        const userLoged = JSON.parse(userJson);
        return userLoged
    }else{
        return null;
    }
}



export default getUserLoged
