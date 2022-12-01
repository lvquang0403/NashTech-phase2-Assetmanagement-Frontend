function formatDate(strDate){
    let date = new Date(strDate);
    let day = (date.getDate()<10)?'0'+date.getDate():date.getDate();
    let month = ((date.getMonth()+1)<10)?'0'+(date.getMonth()+1):(date.getMonth()+1);
    return   day + '-' + month +  '-' +date.getFullYear();
}
export default formatDate;