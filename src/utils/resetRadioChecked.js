
const resetRadioChecked = (name)=>{
    let radio = document.getElementsByName(name);
    for (const i in radio) {
        if(radio[i].checked){
            radio[i].checked=false;
            break;
        }
    }
}



export default resetRadioChecked
