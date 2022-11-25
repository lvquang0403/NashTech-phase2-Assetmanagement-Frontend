const getLocationInSession = ()=>{
    if(window.sessionStorage.getItem('user')){
        const userJson = window.sessionStorage.getItem('user')
        const location = JSON.parse(userJson).locationId;
        return location
    }else{
        return null;
    }
}



export default getLocationInSession
