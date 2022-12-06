import React, { useEffect } from 'react'
import { useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap'
import queryString from 'query-string';


import { Loading } from "notiflix/build/notiflix-loading-aio";
import getLocationInSession from '../../utils/getLocationInSession';

import "./style.scss";
import AssetService from '../../services/AssetService';
import resetRadioChecked from '../../utils/resetRadioChecked';
import shortenSentences from '../../utils/shortenSentences.js';

const RadioListAssets = (props) => {
    const [assets, setAssets] = useState([])
    const [selected, SetSelected] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    
    const loadAssets = async (reload=false)=>{
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
            page = currentPage;
        }
        // check currentPage
        if(currentPage === totalPages && reload === false){
            Loading.remove();
            return null;
        }
       
        const filter = {
            page: page,
            keyword: props.search,
            locationId: locationID,
            states:'Available'
        }
        let predicates = queryString.stringify(filter);
        
        await AssetService.getAllAssets(predicates)
        .then((res) => {
            console.log(res.data.listResponse);
            // check if there is a search or not
            for (const i of res.data.listResponse) {
                if (i.id === props.idData) {
                    SetSelected(true)
                }
            }
            if(page===0){
                setAssets(res.data.listResponse)
            }else{
                setAssets(assets.concat(res.data.listResponse))
            }
            
            setCurrentPage(page+1)
            if (res.data.listResponse != null) {
                setTotalPages(res.data.totalPage)
            }
            Loading.remove();
        }, (err) => {
            console.log(err.toString());
            Loading.remove();
        })
    }

    const handleClickRadio = ()=>{
        let radio = document.getElementsByName('selectAsset');
        let assetID='';
        // check  radio  checked?
        for (const i in radio) {
            if (radio[i].checked) {
                assetID = radio[i].value;
                break;
            }
        }
        // find asset checked in list
        for (const item of assets) {
            if(assetID === item.id){
                props.setSelectedData(item)
                break;
            }
        }
    }

    useEffect(() => {
        resetRadioChecked('selectAsset');
        props.setSelectedData(undefined)
        loadAssets(true)
    }, [props.search]);
    

  return (
    <div className='__radioListData'>
        <Row className='__row-header'>
            <Col xs={1}/>
            <Col xs={3}>
                <ListGroup.Item action>
                    Asset Code
                </ListGroup.Item>
            </Col>
            <Col xs={5}>
                <ListGroup.Item action>
                    Asset Name
                </ListGroup.Item>
            </Col>
            <Col xs={3}>
                <ListGroup.Item action>
                    Category
                </ListGroup.Item>
            </Col>
        </Row>
        <div className='__body-list'>
            {
                (assets)?assets.map((item, index)=>(
                    <Row className='__row-content' key={index} onClick={(e)=>{
                            document.getElementById(`selectAsset_${item.id}`).checked =true;
                            handleClickRadio()
                        }}
                        title={item.name}
                    >
                        <Col xs={1} className='__col-content'>
                            {
                                (props.idData === item.id && selected===true)
                                ?<input className='__radio-select'  
                                    id={`selectAsset_${item.id}`}
                                    type="radio" 
                                    defaultChecked
                                    name='selectAsset' 
                                    value={item.id}
                                    onClick={handleClickRadio}
                                />
                                :<input className='__radio-select'  
                                    id={`selectAsset_${item.id}`}
                                    type="radio" 
                                    name='selectAsset' 
                                    value={item.id}
                                    onClick={handleClickRadio}
                                />
                            }
                        </Col>
                        <Col xs={3} className='__col-content'>
                            <ListGroup.Item>
                            {item.id}
                            </ListGroup.Item>
                        </Col>
                        <Col xs={5} className='__col-content'>
                            <ListGroup.Item style={{overflow:"auto", width:'100%'}}>
                                {shortenSentences(item.name, 30)}
                            </ListGroup.Item>
                        </Col>
                        <Col xs={3} className='__col-content'>
                            <ListGroup.Item>
                            {shortenSentences(item.category, 30)}
                            </ListGroup.Item>
                        </Col>
                    </Row>
                ))
                :null
            }
            {
                (currentPage>=totalPages)?null
                :<Row className='__row-content'  onClick={()=>{
                    loadAssets(false)
                }}>
                    <Col xs={12} className='__col-content __more'>
                        <ListGroup.Item action><u>see mores</u></ListGroup.Item>
                    </Col>
                </Row>
            }
        </div>
    </div>
    
        
   
  )
}

export default RadioListAssets
