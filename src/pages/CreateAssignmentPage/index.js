import React, { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";

import { Loading } from "notiflix/build/notiflix-loading-aio";

import "./index.scss";
import ModalSelectRadio from '../../components/modalSelectRadio/ModalSelectRadio';
import validateAssignmentCreateUpdate from '../../utils/validateAssignmentCreateUpdate';
import AssignmentService from '../../services/AssignmentService';
import getUserLoged from '../../utils/getUserLoged';


const CreateAssignment = () => {
    const navigate = useNavigate();
    // show modal
    const [modalSelectUserShow, setModalSelectUserShow] = useState(false);
    const [modalSelectAssetShow, setModalSelectAssetShow] = useState(false);
    // user and asset selected
    const [selectedUser, setSelectedUser] = useState(undefined);
    const [selectedAsset, setSelectedAsset] = useState(undefined);
    //  data
    const [note, setNote] = useState('');
    const [assignedDate, setAssignedDate] = useState(setDefaultInputDate());
    //  show button save
    const [buttonSave, setButtonSave] = useState(false);
    //  text validate
    const [textError, setTextError] = useState({
        user: 'success',
        asset: 'success',
        note: 'success',
        assignedDate: 'success'
    })

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    // change data in input
    const changeInputNote = (e) => {
        let inpNote = e.target.value;
        let error = {};
        error.user = validateAssignmentCreateUpdate.user(selectedUser);
        error.asset = validateAssignmentCreateUpdate.asset(selectedAsset);
        error.note = validateAssignmentCreateUpdate.note(inpNote);
        error.assignedDate = validateAssignmentCreateUpdate.assignedDate(assignedDate);
        if (error.assignedDate === 'success' && error.note === 'success' && error.user === 'success' && error.asset=== 'success' ) {
            setButtonSave(true)
        } else {
            setButtonSave(false)
        }
        setTextError(error)
        setNote(inpNote)
    }
    const changeInputAssignedDate = (e) => {
        let date = e.target.value;
        let error = {};

        error.user = validateAssignmentCreateUpdate.user(selectedUser);
        error.asset = validateAssignmentCreateUpdate.asset(selectedAsset);
        error.assignedDate = validateAssignmentCreateUpdate.assignedDate(date);
        error.note = validateAssignmentCreateUpdate.note(note);
        if (error.assignedDate === 'success' && error.note === 'success' && error.user === 'success'   && error.asset === 'success' ) {
            setButtonSave(true)
        } else {
            setButtonSave(false)
        }
        setTextError(error)
        setAssignedDate(date)
    }
    const handleChangeUserSelected = (data) => {
        setSelectedUser(data)
        let error = {};
        error.user = validateAssignmentCreateUpdate.user(data);
        error.asset = validateAssignmentCreateUpdate.asset(selectedAsset);
        error.assignedDate = validateAssignmentCreateUpdate.assignedDate(assignedDate);
        error.note = validateAssignmentCreateUpdate.note(note);
        if (error.assignedDate === 'success' && error.note === 'success' && error.user === 'success'  && error.asset === 'success' ) {
            setButtonSave(true)
        } else {
            setButtonSave(false)
        }
        setTextError(error)


    }
    const handleChangeAssetSelected = (data) => {
        setSelectedAsset(data)
        let error = {};
        error.user = validateAssignmentCreateUpdate.user(selectedUser);
        error.asset = validateAssignmentCreateUpdate.asset(data);
        error.assignedDate = validateAssignmentCreateUpdate.assignedDate(assignedDate);
        error.note = validateAssignmentCreateUpdate.note(note);
        if (error.assignedDate === 'success' && error.note === 'success' && error.user === 'success'  && error.asset === 'success' ) {
            setButtonSave(true)
        } else {
            setButtonSave(false)
        }
        setTextError(error)


    }

    const handleSubmit = (e) => {
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
        if (error.note !== 'success' || error.assignedDate !== 'success'
            || error.user !== 'success' || error.asset !== 'success') {
            setButtonSave(false)
            setTextError(error)
            Loading.remove();
        } else {

            const assignedDateFormated = formatDate(assignedDate)
            const data = {
                assignBy: userLoged.id,
                assignTo: selectedUser.id,
                assetId: selectedAsset.id,
                assignedDate: assignedDateFormated,
                note: note
            }
            console.log(data);
            AssignmentService.create(data)
                .then((response) => {
                    console.log(response.data);
                    navigate('/manage-assignment');
                    Loading.remove();
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.data && error.response.data !== '') {
                        alert(error.response.data.message)
                    } else {
                        alert(error.message)
                    }
                    Loading.remove();
                });
        }
    }
    const handleClickCanelButton = (e) => {
        e.preventDefault();

        navigate('/manage-assignment');

    }

    return (
        <Container className='_createAssignment'>
            <h5 className='_title'>Create New Assignment</h5>
            <form onSubmit={handleSubmit} >
                <ModalSelectRadio title='Select User' select='user'
                    show={modalSelectUserShow} onHide={() => setModalSelectUserShow(false)}
                    setSelectedData={handleChangeUserSelected} />
                <ModalSelectRadio title='Select Asset' select='asset' show={modalSelectAssetShow}
                    onHide={() => setModalSelectAssetShow(false)}
                    setSelectedData={handleChangeAssetSelected} />

                <Row className='_rowCreateAssignment'>
                    <Col xs={3}>
                        <label for="nameAsset" className='_label'>User</label>
                    </Col>
                    <Col xs={9}>
                        <InputGroup className="mb-3">
                            <Form.Control className='__input-search' readOnly maxLength={0} value={(selectedUser) ? selectedUser.fullName : ''} />
                            <div className='__button-search' onClick={() => setModalSelectUserShow(true)}>
                                <BsSearch className='__icon-search' />
                            </div>
                        </InputGroup>
                        {
                            (textError.user !== 'success') ?
                                <Form.Text className="_text-error">
                                    {textError.user}
                                </Form.Text> : null
                        }
                    </Col>
                </Row>
                <Row className='_rowCreateAssignment'>
                    <Col xs={3}>
                        <label for="nameAsset" className='_label'>Asset</label>
                    </Col>
                    <Col xs={9}>
                        <InputGroup className="mb-3">
                            <Form.Control readOnly className='__input-search' maxLength={0} value={(selectedAsset) ? selectedAsset.name : ''} />
                            <div className='__button-search' onClick={() => setModalSelectAssetShow(true)}>
                                <BsSearch className='__icon-search' />
                            </div>
                        </InputGroup>
                        {
                            (textError.asset !== 'success') ?
                                <Form.Text className="_text-error">
                                    {textError.asset}
                                </Form.Text> : null
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
                            defaultValue={setDefaultInputDate()}
                        />
                        {
                            (textError.assignedDate !== 'success') ?
                                <Form.Text className="_text-error">
                                    {textError.assignedDate}
                                </Form.Text> : null
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
                            maxLength={500}
                            style={{ height: '100px' }}
                        />
                        {
                            (textError.note !== 'success') ?
                                <Form.Text className="_text-error">
                                    {textError.note}
                                </Form.Text> : null
                        }
                    </Col>
                </Row>
                <Row className='_rowCreateAssignment'>
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

export default CreateAssignment


function setDefaultInputDate() {
    let date = new Date();
    let day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate();
    let month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    return date.getFullYear() + '-' + month + '-' + day;
}