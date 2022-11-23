function formatDate(strDate, format = 'dd-mm-yy'){
    let date = new Date(strDate);
    switch (format) {
        case 'dd-mm-yy':
            return   date.getDate() + '-' + (date.getMonth()+1) +  '-' +date.getFullYear();    
        case 'mm-dd-yy':
            return  (date.getMonth()+1) + '-' + date.getDate() +  '-' +date.getFullYear();      
        case 'yy-mm-dd':
            return  date.getFullYear() + '-' + (date.getMonth()+1) +  '-' +date.getDate();    
        default:
            console.log('incorrect date format');
            break;
    }
}
export default formatDate;