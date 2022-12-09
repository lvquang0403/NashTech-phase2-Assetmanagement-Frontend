import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap'
import queryString from 'query-string';


import { Loading } from "notiflix/build/notiflix-loading-aio";
import UserService from '../../services/UserService';
import getLocationInSession from '../../utils/getLocationInSession';

import "./style.scss";
import resetRadioChecked from '../../utils/resetRadioChecked';
import shortenSentences from '../../utils/shortenSentences.js';

const RadioListUsers = (props) => {
    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [selected, SetSelected] = useState(false)
    
    const loadUsers = async (reload=false)=>{
        Loading.standard("Loading...");
        // check location id
        let locationID = getLocationInSession();
        if (locationID === null) {
            alert("The administrator's location could not be found");
            Loading.remove();
            return null;
        }
       
        // check if there is a search or not
        let page = 0;
        if(!reload){
            page= currentPage;
        }
         //      check currentPage
        if(currentPage === totalPages && reload === false){
            Loading.remove();
            return null;
        }
        
        const filter = {
            page: page,
            keyword: props.search,
            locationId: locationID,
        }
        let predicates = queryString.stringify(filter);
        await UserService.getAllUsers(predicates).then((res) => {
            // check if there is a search or not
            if(page===0){
                setUsers(res.data.listResponse)
            }else{
                setUsers(users.concat(res.data.listResponse))
            }
            
            setCurrentPage(page+1)
            if (res.data.listResponse != null) {
                for (const i of res.data.listResponse) {
                    if (i.id === props.idData) {
                        SetSelected(true)
                    }
                }
                setTotalPages(res.data.totalPage)
            }
           
            Loading.remove();
        }, (err) => {
            console.log(err.toString());
            Loading.remove();
        })
    }

    const handleClickRadio = ()=>{
        let radio = document.getElementsByName('selectUser');
        let userID='';
        // check  radio  checked?
        for (const i in radio) {
            if (radio[i].checked) {
                userID = radio[i].value;
                break;
            }
        }
        // find user checked in list
        for (const item of users) {
            if(userID === item.id){
                props.setSelectedData(item)
                break;
            }
        }
    }

    useEffect(() => {
        resetRadioChecked('selectUser');
        props.setSelectedData(undefined)
        loadUsers(true);
    }, [props.search]);
    

  return (
    <div className='__radioListData'>
        <Row className='__row-header'>
            <Col xs={1}/>
            <Col xs={2}>
                <ListGroup.Item action>Staff Code</ListGroup.Item>
            </Col>
            <Col xs={4}>
                <ListGroup.Item action >Full Name</ListGroup.Item>
            </Col>
            <Col xs={3}>
                <ListGroup.Item action >UserName</ListGroup.Item>
            </Col>
            <Col xs={2}>
                <ListGroup.Item action >Type</ListGroup.Item>
            </Col>
        </Row>
        
        <div className='__body-list'>
            {
                (users)?users.map((item, index)=>(
                    <Row className='__row-content' key={index} onClick={(e)=>{
                            document.getElementById(`selectAsset_${item.id}`).checked =true;
                            handleClickRadio()
                        }}
                        title={item.fullName}
                    >
                        <Col xs={1} className='__col-content'>
                            {
                                (props.idData === item.id  && selected===true)
                                ?<input className='__radio-select' 
                                    id={`selectAsset_${item.id}`}
                                    type="radio" 
                                    name='selectUser'  
                                    defaultChecked
                                    value={item.id}
                                    onClick={handleClickRadio}
                                />
                                :<input className='__radio-select' 
                                    id={`selectAsset_${item.id}`}
                                    type="radio" 
                                    name='selectUser'  
                                    value={item.id}
                                    onClick={handleClickRadio}
                                />
                            }
                        </Col>
                        <Col xs={2} className='__col-content'>
                            <ListGroup.Item>
                                {item.id}
                            </ListGroup.Item>
                        </Col>
                        <Col xs={4} className='__col-content'>
                            <ListGroup.Item>
                                {shortenSentences(item.fullName, 30)}
                            </ListGroup.Item>
                        </Col>
                        <Col xs={3}>
                            <ListGroup.Item>
                                {item.userName}
                            </ListGroup.Item>
                        </Col>
                        <Col xs={2} className='__col-content'>
                            <ListGroup.Item>
                                {item.role}
                            </ListGroup.Item>
                        </Col>
                    </Row>
                ))
                :null
            }
            {
                (currentPage>=totalPages)?null
                :<Row className='__row-content'  onClick={()=>{
                    loadUsers(false)
                }}>
                    <Col xs={12} className='__col-content __more'>
                        <ListGroup.Item action><u>see more</u></ListGroup.Item>
                    </Col>
                </Row>
            }
        </div>
    </div>
  )
}

export default RadioListUsers
