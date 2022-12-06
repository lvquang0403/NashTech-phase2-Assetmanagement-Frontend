const shortenSentences = (str, length)=>{
    if(str){
        let result = '';
        if(str.length>length){
            result= str.slice(0, length);
            result += '....'
        }else{
            result = str;
        }
    
        return result;
    }
    return null
    
}



export default shortenSentences
