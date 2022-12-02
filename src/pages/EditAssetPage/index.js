import React, { useState } from 'react'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { BsFillCaretDownFill } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from "notiflix/build/notiflix-loading-aio";

import AssetService from '../../services/AssetService';
import validateAssetInsert from '../../utils/validateAssetInsert';

import "./index.scss";
import formatDate from '../../utils/formatDate';



const EditAsset = () => {
    const params = useParams();
    const navigate = useNavigate();
    // save data of asset need editing
    const [asset, setAsset] = useState(undefined);
    // show button 'save'
    const [buttonSave, setButtonSave] = useState(true);
    // save data for editing asset
    const [nameAsset, setNameAsset] = useState('');
    const [specification, setSpecification] = useState('');
    const [installedDate, setInstalledDate] = useState('');
    // error message text
    const [textError, setTextError] = useState({
        name:'success',
        specification:'success',
        installedDate:'success'
    })

    // Load data from Database using API 
    const loadAsset = useCallback(()=>{
        Loading.standard("Loading...");
        AssetService.getAssetById(params.id)
            .then((response)=>{
                console.log(response.data);
                if (response.data.id === null) {
                    alert("This asset does not exist");
                    return navigate('/manage-asset')
                }
                if(response.data.state==="Assigned"){
                    alert("This asset cannot be edited");
                    return navigate('/manage-asset')
                }
                setAsset(response.data)
                setNameAsset(response.data.name)
                setSpecification(response.data.specification)
                setInstalledDate(response.data.installedDate)
                Loading.remove();
            })
            .catch((error)=>{
                console.log(error);
                if(error.response){
                    alert(error.response.data.message)
                }else{
                    alert(error.message)
                }
                Loading.remove();
            });
      },[])

    // When change value of Input Name
    const handleChangeInputName = (e)=>{
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
    // When change value of Input Specification
    const handleChangeInputSpecification = (e)=>{
        let inpSpecification = e.target.value;
        let error = {};
        console.log(nameAsset);
        error.specification = validateAssetInsert.specification(inpSpecification);
        error.name = validateAssetInsert.name(nameAsset);
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
    // When change value of Input Installed Date
    const handleChangeInputInstalledDate = (e)=>{
        let date = e.target.value;
        let error = {};
        error.installedDate = validateAssetInsert.installedDate(date);
        error.name = validateAssetInsert.name(nameAsset);
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
    // When Click button 'Save'
    const handleSubmit = (e)=>{
        e.preventDefault();
        Loading.standard("Loading...");
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
        if(state !== 'AVAILABLE' && state !== 'NOT_AVAILABLE'  && state !== 'RECYCLING'  && state !== 'RECYCLED'){
            alert('state is malformed')
            Loading.remove();
            return null;
        }
       
        if(error.name !=='success' || error.specification !=='success' || error.installedDate !=='success'){
            setButtonSave(false)
            setTextError(error)
            Loading.remove();
        }else{
            const data = {
                id : params.id,
                name : nameAsset, 
                specification : specification, 
                state : state, 
                installedDate: installedDate
            }
            
            console.log(data);
            AssetService.update(data)
            .then((response)=>{
                Loading.remove();
                navigate('/manage-asset')
            })
            .catch((error)=>{
                console.log(error);
                if(error.response.data){
                    alert(error.response.data.message)
                }else{
                    alert(error.message)
                }
                Loading.remove();
            });
        }
       
    }
    // When click Button cancel
    const handleClickCanelButton = (e)=>{
        e.preventDefault();
        navigate('/manage-asset');
    }

    // load data at start
    useEffect(() => {
        loadAsset();
    }, []);

  return (asset)?(
    <Container className='_editAsset'>
        <h5 className='_title'>Edit Asset</h5>
        <form onSubmit={handleSubmit} >
            <Row className='_rowCreateAsset'>
                <Col xs={3}>
                    <label for="nameAsset" className='_label'>Name</label>
                </Col>
                <Col xs={9}>
                    <Form.Control 
                        onChange={handleChangeInputName}
                        defaultValue={asset.name}
                        id='nameAsset'
                        type="text" 
                        placeholder="Enter Name Asset"
                        maxLength={50} />
                    {
                        // text validate
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
                <div className="_select__dropdown" style={{backgroundColor:"#cdebe7"}}>
                    <div className="_select" >
                        <span className="_chooseCategory">{asset.categoryName}</span>
                        <span className="_iconSelect"><BsFillCaretDownFill/></span> 
                    </div>
                </div>
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
                        defaultValue={asset.specification}
                        onChange={handleChangeInputSpecification}
                        placeholder="Specification"
                        maxLength={500}
                        style={{ height: '100px' }}
                    />
                    {
                        // text validate
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
                        className='__input-date'
                        max="9999-01-01"
                        onChange={handleChangeInputInstalledDate}
                        data-date={formatDate(installedDate)}
                        defaultValue={asset.installedDate}
                    />
                    {
                        // text validate
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
                    {
                        (asset.state.toLocaleLowerCase() === 'Available'.toLocaleLowerCase())?
                        <Form.Check
                            defaultChecked
                            type='radio'
                            name='stateAsset'
                            label='Available'
                            value='AVAILABLE'
                        /> :
                        <Form.Check
                            type='radio'
                            name='stateAsset'
                            label='Available'
                            value='AVAILABLE'
                        />
                    }
                    {
                        (asset.state.toLocaleLowerCase() === 'Not available'.toLocaleLowerCase())?
                        <Form.Check
                            defaultChecked
                            type='radio'
                            name='stateAsset'
                            label='Not available'
                            value='NOT_AVAILABLE'
                        /> :
                        <Form.Check
                            type='radio'
                            name='stateAsset'
                            label='Not available'
                            value='NOT_AVAILABLE'
                        />
                    }
                    {
                        (asset.state.toLocaleLowerCase() === 'Waiting for recycling'.toLocaleLowerCase())?
                        <Form.Check
                            defaultChecked
                            type='radio'
                            name='stateAsset'
                            label='Waiting for recycling'
                            value='RECYCLING'
                        /> :
                        <Form.Check
                            type='radio'
                            name='stateAsset'
                            label='Waiting for recycling'
                            value='RECYCLING'
                        />
                    }
                    {
                        (asset.state.toLocaleLowerCase() === 'Recycled'.toLocaleLowerCase())?
                        <Form.Check
                            defaultChecked
                            type='radio'
                            name='stateAsset'
                            label='Recycled'
                            value='RECYCLED'
                        /> :
                        <Form.Check
                            type='radio'
                            name='stateAsset'
                            label='Recycled'
                            value='RECYCLED'
                        />
                    }
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
  :null
}

export default EditAsset




