import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BsCheckLg, BsFillCaretDownFill,  BsXLg } from "react-icons/bs";
import CategoryService from "../../services/CategoryService";
import validateCategoryInsert from "../../utils/validateCategoryInsert";
import "./SelectInsertAsset.scss";



const SelectInsertAsset = () => {
    const [openInput, setOpenInput] = useState(false);
    const [buttonSave, setButtonSave] = useState(false);
    const [categories, setCategories] = useState(undefined);
    const [categorySelected, setCategorySelected] = useState('');
    const [textError, setTextError] = useState({
        name:'success',
        prefix:'success'
    });
    const loadCategories = useCallback(()=>{
        CategoryService.getAllCategories()
            .then((response)=>{
              setCategories(response.data)
              if(response.data.length > 0){
                setCategorySelected(response.data[0].name)
              }
              
            })
            .catch((error)=>{
                console.log(error);
                if(error.response.data){
                    alert(error.response.data.message)
                }else{
                    alert(error.message)
                }
            });
      },[])
    const openInputNewCategory = ()=>{
        setOpenInput(true)
    }
    const changInput = (e)=>{
        let name = document.getElementById('categoryName').value;
        let prefix = document.getElementById('categoryPrefix').value;
        let error = {
            name:'',
            prefix:''
        };
        error.name = validateCategoryInsert.name(name);
        error.prefix = validateCategoryInsert.prefix(prefix);
        if(error.name ==='success' && error.prefix ==='success'){
            setButtonSave(true)
        }else{
            setButtonSave(false)
        }
        setTextError(error)
    }
    const hamDropdown =  ()=> {
        document.querySelector(".content_dropdown").classList.toggle("hiddenContent");
        let radio = document.getElementsByName("category");
        for (const input of radio) {
            if (input.checked) {
                setCategorySelected(input.getAttribute('data-name'))
            }
        }
        cleanSetup();
    }

    const handleAddCategory = (e)=>{
        let name = document.getElementById('categoryName').value;
        let prefix = document.getElementById('categoryPrefix').value;
        let error = {
            name:'',
            prefix:''
        };
        error.name = validateCategoryInsert.name(name);
        error.prefix = validateCategoryInsert.prefix(prefix);
        if(error.name !=='success' || error.prefix !=='success'){
            setButtonSave(false)
            setTextError(error)
        }else{
            CategoryService.insert(prefix, name)
            .then((response)=>{
                loadCategories();
                cleanSetup();
            })
            .catch((error)=>{
                console.log(error);
                if(error.data){
                alert(error.data.message)
                }else{
                alert(error.message)
                }
            });
        }
    }
    const cleanSetup = ()=>{
        if(document.getElementById('categoryName')){
            document.getElementById('categoryName').value='';
        }
        if(document.getElementById('categoryPrefix')){
            document.getElementById('categoryPrefix').value='';
        }
   
    
    setTextError({
        name:'success',
        prefix:'success'
    })
    setButtonSave(false)
    setOpenInput(false)
    }

    useEffect(() => {
        loadCategories();
    }, []);
  return (
    <div class="_select__dropdown" >
        <div className="_select" onClick={hamDropdown}>
            <span className="_chooseCategory">{categorySelected}</span>
            <span className="_iconSelect"><BsFillCaretDownFill/></span> 
        </div>
        <div class="content_dropdown">
            {
                (categories)? categories.map((item,  index)=>(
                    <div key={index} className="__content" onClick={hamDropdown} >
                        <label for={"category"+index}  onClick={hamDropdown}>{item.name}</label>
                        {
                            (index===0)?
                            <input id={"category"+index} 
                                defaultChecked
                                type={"radio"} 
                                name="category" 
                                data-name={item.name} 
                                value={item.id} 
                                className="_radioSelect"
                            />:
                            <input id={"category"+index} 
                                type={"radio"} 
                                name="category" 
                                data-name={item.name} 
                                value={item.id} 
                                className="_radioSelect"
                            />
                        }
                        
                    </div>
                )):null
                
            }
            {
                openInput
                ?
                <div className="__content __inputText">
                    <Row >
                        <Col xs={5}>
                            <input type={"text"} 
                                onChange={changInput}
                                id='categoryName'  
                                className='_textSelectCategory' 
                                placeholder="Category name"
                            />
                        </Col>
                        <Col xs={2}>
                            <input type={"text"} 
                                onChange={changInput}
                                id='categoryPrefix' 
                                className='_textSelectPrefix' 
                                placeholder="Prefix"
                            />
                        </Col>
                        <Col xs={4}>
                            {
                                buttonSave
                                ?<span className="_iconTrick" onClick={handleAddCategory}><BsCheckLg/></span>
                                :<span className="_iconTrick _notValidate"  ><BsCheckLg/></span>
                            }
                            
                            <span className="_iconX" onClick={cleanSetup}><BsXLg/></span>
                        </Col>
                    </Row>
                    <Row>
                        {
                            (textError.name !== 'success')?
                            <Col xs={5}>
                                <Form.Text className="_text-select-error">
                                    {textError.name}
                                </Form.Text>
                            </Col>
                        : <Col xs={5}/>
                        }
                        {
                            (textError.prefix !== 'success')?
                            <Col xs={2}>
                                <Form.Text className="_text-select-error">
                                    {textError.prefix}
                                </Form.Text>
                            </Col>
                        : <Col xs={2}/>
                        }
                    </Row>
                    
                    
                    
                    
                    
                </div>
                :
                <div className="__content __inputText">
                    <span className="_text-add-new-category" onClick={openInputNewCategory}><u>Add new category</u></span>
                </div>
            }
                
        </div>
    </div>
  )
}

export default SelectInsertAsset

