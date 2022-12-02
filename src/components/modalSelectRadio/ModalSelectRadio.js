import React, { useState } from 'react'
import { useRef } from 'react'
import { Button, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'
import RadioListAssets from '../radioListData/RadioListAssets.js'
import RadioListUsers from '../radioListData/RadioListUsers.js'

import "./style.scss";


const ModalSelectRadio = (props) => {
  // Time Out
  const typingTimeOutRef = useRef(null);
  // save value when change input search
  const [searchFilter, setSearchFilter] = useState('');
  // save data selected
  const [selectedData, setSelectedData] = useState(undefined);
  // When change value of input search
  const handleInputSearchChange = (e) => {
    let value = document.getElementById('search_select_'+props.select).value;
    if (typingTimeOutRef.current) {
        clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
        let regex = /[!@#$%&*()_+=|<>?{}[\]~]/g;
        if (regex.test(value)) {
          setSearchFilter('@')
        }else{
          setSearchFilter(value)
        }
    }, 500);
  } 
  // When click button 'Save'
  const handleSaveButton = (e)=>{
    props.setSelectedData(selectedData);
    setSearchFilter('')
    props.onHide();
  }
  // When click button 'Cancel'
  const handleCancelButton = (e)=>{
    props.onHide()
    setSearchFilter('')
    props.onHide();
  }


  return (
    <Modal {...props} size="lg" centered className='__modalSelectRadio'>
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
            <Row className='_rowCreateAssignment'>
              {props.title}
            </Row>
        </Modal.Title>
        <InputGroup className="mb-3 __searchInput">
          <Form.Control
              id={'search_select_'+props.select}
              onChange={handleInputSearchChange}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
          />
          <Button variant="outline-secondary" id="button-addon2">
              <BsSearch className='__icon-search'/>
          </Button>
      </InputGroup>
      </Modal.Header>
      {/* Seesion */}
      <Modal.Body className='__body'>
        {
          (props.select ==='user')
          ?<RadioListUsers idData={props.idData}   search={searchFilter} setSelectedData={setSelectedData}/>
          :<RadioListAssets idData={props.idData} search={searchFilter} setSelectedData={setSelectedData}/>
        }
        
      </Modal.Body>
      <Modal.Footer>
        {
          (selectedData)
          ?<Button variant="danger" onClick={handleSaveButton}>Save</Button>
          :<Button variant="danger __notValid">Save</Button>
        }
        <Button variant="secondary" onClick={handleCancelButton}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalSelectRadio
