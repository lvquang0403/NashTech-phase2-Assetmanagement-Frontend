import React, { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";

import { Loading } from "notiflix/build/notiflix-loading-aio";

import "./index.scss";
import ModalSelectRadio from '../../components/modalSelectRadio/ModalSelectRadio';
import validateAssignmentCreateUpdate from '../../utils/validateAssignmentCreateUpdate';
import AssignmentService from '../../services/AssignmentService';
import getUserLoged from '../../utils/getUserLoged';
import { useEffect } from 'react';


const EditAssignmentPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    // save assignnment need editing
    const [assignment, setAssignment] = useState(undefined);
    // show modal
    const [modalSelectUserShow, setModalSelectUserShow] = useState(false);
    const [modalSelectAssetShow, setModalSelectAssetShow] = useState(false);
    
    // save data of asset need editing
    // user and asset selected
    const [selectedUser, setSelectedUser] = useState(undefined);
    const [selectedAsset, setSelectedAsset] = useState(undefined);
    const [note, setNote] = useState('');
    const [assignedDate, setAssignedDate] = useState(undefined);
    //  show button save
    const [buttonSave, setButtonSave] = useState(false);
    // error message text
    const [textError, setTextError] = useState({
        user:'success',
        asset:'success',
        note:'success',
        assignedDate:'success'
    })
    
    // load data to API
    const loadAssignment = ()=>{
        Loading.standard("Loading...");
        AssignmentService.getAssignmentById(params.id)
            .then((response)=>{
                console.log(response.data);
                if (response.data.id === null) {
                    alert("This assignment does not exist");
                    return navigate('/manage-assignment')
                }

                const user = {
                    id:response.data.assignToId,
                    fullName: response.data.assignToFirstName + ' ' + response.data.assignToLastName,
                    userName: response.data.assignByUsername
                }
                const asset = {
                    id:response.data.assetId,
                    name: response.data.assetName
                }
                setAssignment(response.data)
                setSelectedUser(user)
                setSelectedAsset(asset)
                setNote(response.data.note)
                setAssignedDate(setDefaultInputDate(response.data.assignedDate) )
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
    }
    // When change value of Input Note
    const changeInputNote = (e)=>{
        let inpNote = e.target.value;
        let error = {};
        error.user = validateAssignmentCreateUpdate.user(selectedUser);
        error.asset = validateAssignmentCreateUpdate.asset(selectedAsset);
        error.note = validateAssignmentCreateUpdate.note(inpNote);
        error.assignedDate = validateAssignmentCreateUpdate.assignedDate(assignedDate);
        
        if(error.assignedDate ==='success' && error.note ==='success' && error.user === 'success' && error.asset === 'success' ){
            setButtonSave(true)
        }else{
            setButtonSave(false)
        }
        setTextError(error)
        setNote(inpNote)
    }
    // When change value of Input Assigned Date
    const changeInputAssignedDate = (e)=>{
        let date = e.target.value;
        let error = {};

        error.user = validateAssignmentCreateUpdate.user(selectedUser);
        error.asset = validateAssignmentCreateUpdate.asset(selectedAsset);
        error.assignedDate = validateAssignmentCreateUpdate.assignedDate(date);
        error.note = validateAssignmentCreateUpdate.note(note);
        if(error.assignedDate ==='success' && error.note ==='success' && error.user === 'success'  && error.asset === 'success' ){
            setButtonSave(true)
        }else{
            setButtonSave(false)
        }
        setTextError(error)
        setAssignedDate(date)
    }
    // When you have selected User
    const handleChangeUserSelected = (data)=>{
        setSelectedUser(data)
        let error = {};
        error.user = validateAssignmentCreateUpdate.user(data);
        error.asset = validateAssignmentCreateUpdate.asset(selectedAsset);
        error.assignedDate = validateAssignmentCreateUpdate.assignedDate(assignedDate);
        error.note = validateAssignmentCreateUpdate.note(note);
        if(error.assignedDate ==='success' && error.note ==='success' && error.user  === 'success' && error.asset === 'success' ){
            setButtonSave(true)
        }else{
            setButtonSave(false)
        }
        setTextError(error)
        
        
    }
    // When you have selected Asset
    const handleChangeAssetSelected = (data)=>{
        setSelectedAsset(data)
        let error = {};
        error.user = validateAssignmentCreateUpdate.user(selectedUser);
        error.asset = validateAssignmentCreateUpdate.asset(data);
        error.assignedDate = validateAssignmentCreateUpdate.assignedDate(assignedDate);
        error.note = validateAssignmentCreateUpdate.note(note);
        if(error.assignedDate ==='success' && error.note ==='success' && error.user  === 'success' && error.asset === 'success' ){
            setButtonSave(true)
        }else{
            setButtonSave(false)
        }
        setTextError(error)
        
        
    }
    // When click button 'SAVE'
    const handleSubmit = (e)=>{
        e.preventDefault();
        Loading.standard("Loading...");
        let error = {};
        // check location id
        let userLoged = getUserLoged();
        if (userLoged === null) {
            alert('You have not sign in to the system yet');
            Loading.remove();
            return null;
        }
        // validate
        error.user = validateAssignmentCreateUpdate.user(selectedUser);
        error.asset = validateAssignmentCreateUpdate.asset(selectedAsset);
        error.note = validateAssignmentCreateUpdate.note(note);
        error.assignedDate = validateAssignmentCreateUpdate.assignedDate(assignedDate);
        if(error.note !=='success' || error.assignedDate !=='success' 
            || error.user !=='success'|| error.asset !=='success'){
            setButtonSave(false)
            setTextError(error)
            Loading.remove();
        }else{
            const data = { 
                assignmentId : assignment.id, 
                assignTo : selectedUser.id, 
                assetId : selectedAsset.id, 
                assignedDate : assignedDate, 
                note: note
            }
            console.log(data);
            AssignmentService.update(data)
            .then((response)=>{
                console.log(response.data);
                navigate('/manage-assignment');
                Loading.remove();
            })
            .catch((error)=>{
                console.log(error);
                if(error.response.data && error.response.data !==''){
                    alert(error.response.data.message)
                }else{
                    alert(error.message)
                }
                Loading.remove();
            });
        }
    }
    // When click button 'Cancel'
    const handleClickCanelButton = (e)=>{
        e.preventDefault();
        navigate('/manage-assignment');
    }

    // load data at start
    useEffect(() => {
        loadAssignment();
    }, []);
  return (
    <Container className='_createAssignment'>
        <h5 className='_title'>Edit Assignment</h5>
        <form onSubmit={handleSubmit} >
            <ModalSelectRadio title='Select User' select='user' 
                idData={(selectedUser)?selectedUser.id:undefined}
                show={modalSelectUserShow} onHide={() => setModalSelectUserShow(false)}
                setSelectedData={handleChangeUserSelected} />
            <ModalSelectRadio title='Select Asset' select='asset'
                idData={(selectedAsset)?selectedAsset.id:undefined}
                show={modalSelectAssetShow} 
                onHide={() => setModalSelectAssetShow(false)}
                setSelectedData={handleChangeAssetSelected} />

            <Row className='_rowCreateAssignment'>
                <Col xs={3}>
                    <label for="nameAsset" className='_label'>User</label>
                </Col>
                <Col xs={9}>
                    <InputGroup className="mb-3">
                        <Form.Control readOnly className='__input-search' maxLength={0} value={(selectedUser)?`${selectedUser.fullName} ( ${selectedUser.userName} )`:''}/>
                        <div  className='__button-search'  onClick={() => setModalSelectUserShow(true)}>
                            <BsSearch className='__icon-search'/>
                        </div>
                    </InputGroup>
                    {
                        (textError.user !== 'success')?
                        <Form.Text className="_text-error">
                            {textError.user}
                        </Form.Text>:null
                    }
                </Col>
            </Row>
            <Row className='_rowCreateAssignment'>
                <Col xs={3}>
                    <label for="nameAsset" className='_label'>Asset</label>
                </Col>
                <Col xs={9}>
                    <InputGroup className="mb-3">
                        <Form.Control readOnly  className='__input-search' maxLength={0} value={(selectedAsset)?selectedAsset.name:''}/>
                        <div  className='__button-search' onClick={() => setModalSelectAssetShow(true)}>
                            <BsSearch className='__icon-search'/>
                        </div>
                    </InputGroup>
                    {
                        (textError.asset !== 'success')?
                        <Form.Text className="_text-error">
                            {textError.asset}
                        </Form.Text>:null
                    }
                </Col>
            </Row>
            <Row className='_rowCreateAssignment'>
                <Col xs={3}>
                    <label for="assignedDate" className='_label'>Assigned Date</label>
                </Col>
                <Col xs={9}>
                    <Form.Control
                        id="assignedDate"
                        type="date"
                        max="9999-01-01"
                        onChange={changeInputAssignedDate}
                        defaultValue={assignedDate}
                    /> 
                    
                    {
                        (textError.assignedDate !== 'success')?
                        <Form.Text className="_text-error">
                            {textError.assignedDate}
                        </Form.Text>:null
                    }
                </Col>
            </Row>
            <Row className='_rowCreateAssignment'>
                <Col xs={3}>
                    <label for="note" className='_label'>Note</label>
                </Col>
                <Col xs={9}>
                    <Form.Control
                        className={`_textarea `} 
                        id="note"
                        as="textarea"
                        onChange={changeInputNote}
                        defaultValue={note}
                        maxLength={500}
                        style={{ height: '100px' }}
                    />
                    {
                        (textError.note !== 'success')?
                        <Form.Text className="_text-error">
                            {textError.note}
                        </Form.Text>:null
                    }
                </Col>
            </Row>
            <Row className='_rowCreateAssignment'>
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

export default EditAssignmentPage

function setDefaultInputDate(strDate){
    let date = new Date(strDate);
    let day = (date.getDate()<10)?'0'+date.getDate():date.getDate();
    let month = ((date.getMonth()+1)<10)?'0'+(date.getMonth()+1):(date.getMonth()+1);
    return   date.getFullYear() + '-' + month +  '-' +day;
}