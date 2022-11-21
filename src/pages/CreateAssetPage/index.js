import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import SelectInsertAsset from '../../components/form/SelectInsertAsset';
import AssetService from '../../services/AssetService';
import validateAssetInsert from '../../utils/validateAssetInsert';

import "./index.scss";

const now = new Date();
const defaultDate = now.getFullYear() + '-' + (now.getMonth()+1) + '-' +now.getDate();
const CreateAsset = () => {
    const navigate = useNavigate();
    const [buttonSave, setButtonSave] = useState(false);
    const [nameAsset, setNameAsset] = useState('');
    const [specification, setSpecification] = useState('');
    const [installedDate, setInstalledDate] = useState('');

    const [textError, setTextError] = useState({
        name:'success',
        specification:'success',
        installedDate:'success'
    })

    // change data in input
    const changInputName = (e)=>{
        let name = e.target.value;
        let error = {};
        error.name = validateAssetInsert.name(name);
        error.installedDate = validateAssetInsert.installedDate(installedDate);
        error.specification = validateAssetInsert.specification(specification);
        if(error.name ==='success' && error.specification ==='success' && error.installedDate ==='success'){
            setButtonSave(true)
        }else{
            setButtonSave(false)
        }
        setTextError(error)
        setNameAsset(name)
    }
    const changInputSpecification = (e)=>{
        let inpSpecification = e.target.value;
        let error = {};
        error.specification = validateAssetInsert.specification(inpSpecification);
        error.name = validateAssetInsert.specification(nameAsset);
        error.installedDate = validateAssetInsert.installedDate(installedDate);
        if(error.name ==='success' && error.specification ==='success' && error.installedDate ==='success'){
            setButtonSave(true)
        }else{
            setButtonSave(false)
        }
        console.log(error);
        setTextError(error)
        setSpecification(inpSpecification)
    }
    const changInputInstalledDate = (e)=>{
        let date = e.target.value;
        let error = {};
        error.installedDate = validateAssetInsert.installedDate(date);
        error.name = validateAssetInsert.specification(nameAsset);
        error.specification = validateAssetInsert.specification(specification);
        if(error.name ==='success' && error.specification ==='success' && error.installedDate ==='success'){
            setButtonSave(true)
        }else{
            setButtonSave(false)
        }
        console.log(error);
        setTextError(error)
        setInstalledDate(date)
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        let error = {};
        // validate
        error.name = validateAssetInsert.name(nameAsset);
        error.specification = validateAssetInsert.specification(specification);
        error.installedDate = validateAssetInsert.installedDate(installedDate);
        // setState
        let state='';
        let radio = document.getElementsByName('stateAsset')
        for (const i in radio) {
            if (radio[i].checked) {
                state = radio[i].value;
            }
        }
        if(state !== 'AVAILABLE' && state !== 'NOT_AVAILABLE'){
            alert('state is malformed')
            return null;
        }

        // setcategoryID
        let categoryID='';
        let select = document.getElementsByName('category')
        for (const i in select) {
            if (select[i].checked) {
                categoryID = select[i].value;
            }
        }
       
        if(error.name !=='success' || error.specification !=='success' || error.installedDate !=='success'){
            setButtonSave(false)
            setTextError(error)
        }else{
            const data = {
                name : nameAsset, 
                specification : specification, 
                categoryId : categoryID, 
                state : state, 
                locationId : 1, 
                installedDate: installedDate
            }
            
            AssetService.insert(data)
            .then((response)=>{
                navigate('/manage-asset')
            })
            .catch((error)=>{
                console.log(error);
                if(error.response.data){
                    alert(error.response.data.message)
                }else{
                    alert(error.message)
                }
            });
        }
    }
    const handleClickCanelButton = (e)=>{
        e.preventDefault();
        
        navigate('/manage-asset');
        
    }

  return (
    <Container className='_createAsset'>
        <h5 className='_title'>Create New Asset</h5>
        <form onSubmit={handleSubmit} >
            <Row className='_rowCreateAsset'>
                <Col xs={3}>
                    <label for="nameAsset" className='_label'>Name</label>
                </Col>
                <Col xs={9}>
                    <Form.Control 
                        onChange={changInputName}
                        id='nameAsset'
                        type="text" 
                        placeholder="Enter Name Asset"  />
                    {
                        (textError.name !== 'success')?
                        <Form.Text className="_text-error">
                            {textError.name}
                        </Form.Text>:null
                    }
                    
                </Col>
            </Row>
            <Row className='_rowCreateAsset'>
                <Col xs={3}>
                    <label  className='_label'>Category</label>
                </Col>
                <Col xs={9}>
                    <SelectInsertAsset/>
                </Col>
            </Row>
            <Row className='_rowCreateAsset'>
                <Col xs={3}>
                    <label for="specification" className='_label'>Specification</label>
                </Col>
                <Col xs={9}>
                    <Form.Control
                        className={`_textarea `} 
                        id="specification"
                        as="textarea"
                        onChange={changInputSpecification}
                        placeholder="Specification"
                        style={{ height: '100px' }}
                    />
                    {
                        (textError.specification !== 'success')?
                        <Form.Text className="_text-error">
                            {textError.specification}
                        </Form.Text>:null
                    }
                </Col>
            </Row>
            <Row className='_rowCreateAsset'>
                <Col xs={3}>
                    <label for="installedDate" className='_label'>Installed date</label>
                </Col>
                <Col xs={9}>
                    <Form.Control
                        id="installedDate"
                        type="date"
                        onChange={changInputInstalledDate}
                        defaultValue={defaultDate}
                    />
                    {
                        (textError.installedDate !== 'success')?
                        <Form.Text className="_text-error">
                            {textError.installedDate}
                        </Form.Text>:null
                    }
                </Col>
            </Row>
            <Row className='_rowCreateAsset'>
                <Col xs={3}>
                    <label className='_label'>State </label>
                </Col>
                <Col xs={9}>
                    <Form.Check
                        defaultChecked
                        type='radio'
                        name='stateAsset'
                        label='Available'
                        value='AVAILABLE'
                    />
                    <Form.Check
                        type='radio'
                        name='stateAsset'
                        label='Not available'
                        value='NOT_AVAILABLE'
                    />
                </Col>
            </Row>
            <Row className='_rowCreateAsset'>
                <Col xs={6}/>
                <Col xs={2}>
                    {
                        buttonSave
                        ?<Button variant="danger" type={'submit'} >Save</Button>
                        :<Button variant="danger" className='_notValidate' disabled >Save</Button>
                    }
                </Col>
                <Col xs={2}>
                    <Button variant="outline-secondary" onClick={handleClickCanelButton}>Cancel</Button>
                </Col>
            </Row>
            
        </form>
    </Container>
    
  )
}

export default CreateAsset


