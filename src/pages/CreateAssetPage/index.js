import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import SelectInsertAsset from '../../components/form/SelectInsertAsset';
import AssetService from '../../services/AssetService';
import validateAssetInsert from '../../utils/validateAssetInsert';
import { Loading } from "notiflix/build/notiflix-loading-aio";

import "./index.scss";
import getLocationInSession from '../../utils/getLocationInSession';
// initialization new  date() to do installedDate default 
const now = new Date();
const defaultDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
const CreateAsset = () => {
    const navigate = useNavigate();
    // show button 'save'
    const [buttonSave, setButtonSave] = useState(false);
    // save data to create assets
    const [nameAsset, setNameAsset] = useState('');
    const [specification, setSpecification] = useState('');
    const [installedDate, setInstalledDate] = useState(defaultDate);
    // error message text
    const [textError, setTextError] = useState({
        name: 'success',
        specification: 'success',
        installedDate: 'success'
    })

    // when change value in input name
    const handleChangeInputName = (e) => {
        let name = e.target.value;
        let error = {};
        error.name = validateAssetInsert.name(name);
        error.installedDate = validateAssetInsert.installedDate(installedDate);
        error.specification = validateAssetInsert.specification(specification);
        if (error.name === 'success' && error.specification === 'success' && error.installedDate === 'success') {
            setButtonSave(true)
        } else {
            setButtonSave(false)
        }
        setTextError(error)
        setNameAsset(name)
    }
    // when change value in input Specification
    const handleChangeInputSpecification = (e) => {
        let inpSpecification = e.target.value;
        let error = {};
        error.specification = validateAssetInsert.specification(inpSpecification);
        error.name = validateAssetInsert.name(nameAsset);
        error.installedDate = validateAssetInsert.installedDate(installedDate);
        if (error.name === 'success' && error.specification === 'success' && error.installedDate === 'success') {
            setButtonSave(true)
        } else {
            setButtonSave(false)
        }
        console.log(error);
        setTextError(error)
        setSpecification(inpSpecification)
    }
    // when change value in input Installed Date
    const handleChangeInputInstalledDate = (e) => {
        let date = e.target.value;
        let error = {};
        error.installedDate = validateAssetInsert.installedDate(date);
        error.name = validateAssetInsert.name(nameAsset);
        error.specification = validateAssetInsert.specification(specification);
        if (error.name === 'success' && error.specification === 'success' && error.installedDate === 'success') {
            setButtonSave(true)
        } else {
            setButtonSave(false)
        }
        console.log(error);
        setTextError(error)
        setInstalledDate(date)
    }
    // When click button save 
    const handleSubmit = (e) => {
        e.preventDefault();
        Loading.standard("Loading...");
        // initialization variable
        let error = {};
        let state = '';
        let categoryID = '';
        // check location id
        let locationID = getLocationInSession();
        if (locationID === null) {
            alert("The administrator's location could not be found");
            Loading.remove();
            return null;
        }

        // validate
        error.name = validateAssetInsert.name(nameAsset);
        error.specification = validateAssetInsert.specification(specification);
        error.installedDate = validateAssetInsert.installedDate(installedDate);

        // set State
        let radio = document.getElementsByName('stateAsset')
        for (const i in radio) {
            if (radio[i].checked) {
                state = radio[i].value;
            }
        }
        if (state !== 'AVAILABLE' && state !== 'NOT_AVAILABLE') {
            alert('state is malformed')
            Loading.remove();
            return null;
        }

        // set categoryID
        let select = document.getElementsByName('category')
        for (const i in select) {
            if (select[i].checked) {
                categoryID = select[i].value;
            }
        }
//      if there is invalid data then out
        if (error.name !== 'success' || error.specification !== 'success' || error.installedDate !== 'success') {
            setButtonSave(false)
            setTextError(error)
            Loading.remove();
        } else {
            // set data for API  Create Asset
            const data = {
                name: nameAsset,
                specification: specification,
                categoryId: categoryID,
                state: state,
                locationId: locationID,
                installedDate: installedDate
            }
            // call API Create Asset
            AssetService.insert(data)
                .then((response) => {
                    navigate('/manage-asset');
                    Loading.remove();
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.data) {
                        alert(error.response.data.message)
                    } else {
                        alert(error.message)
                    }
                    Loading.remove();
                });
        }
    }
    // When click Cancel button then redired to manage asset page 
    const handleClickCanelButton = (e) => {
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
                            onChange={handleChangeInputName}
                            id='nameAsset'
                            type="text"
                            placeholder="Enter Name Asset"
                            maxLength={50} />
                        {
                            // Validate
                            (textError.name !== 'success') ?
                                <Form.Text className="_text-error">
                                    {textError.name}
                                </Form.Text> : null
                        }

                    </Col>
                </Row>
                <Row className='_rowCreateAsset'>
                    <Col xs={3}>
                        <label className='_label'>Category</label>
                    </Col>
                    <Col xs={9}>
                        <SelectInsertAsset />
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
                            onChange={handleChangeInputSpecification}
                            placeholder="Specification"
                            maxLength={500}
                            style={{ height: '100px' }}
                        />
                        {
                            // Validate
                            (textError.specification !== 'success') ?
                                <Form.Text className="_text-error">
                                    {textError.specification}
                                </Form.Text> : null
                        }
                    </Col>
                </Row>
                <Row className='_rowCreateAsset'>
                    <Col xs={3}>
                        <label for="installedDate" className='_label'>Installed date</label>
                    </Col>
                    <Col xs={9}>
                        <Form.Control
                            min="1900-01-01"
                            id="installedDate"
                            type="date"
                            max="9999-01-01"
                            className='__input-date'
                            onChange={handleChangeInputInstalledDate}
                            defaultValue={now}
                        />
                        {
                            // Validate
                            (textError.installedDate !== 'success') ?
                                <Form.Text className="_text-error">
                                    {textError.installedDate}
                                </Form.Text> : null
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
                    <Col xs={6} />
                    <Col xs={2}>
                        {
                            buttonSave
                                ? <Button variant="danger" type={'submit'} >Save</Button>
                                : <Button variant="danger" className='_notValidate' disabled >Save</Button>
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


