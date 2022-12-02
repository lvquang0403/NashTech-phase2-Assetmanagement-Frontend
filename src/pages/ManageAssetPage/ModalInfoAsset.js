import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import AssetService from "../../services/AssetService";
import Moment from 'react-moment';
import { Loading } from "notiflix/build/notiflix-loading-aio";
const cols = [
    { name: 'Date', isDropdown: false },
    { name: 'Assigned to', isDropdown: false },
    { name: 'Assigned by', isDropdown: false },
    { name: 'Returned Date', isDropdown: false }
]
const ModalInfoAsset = ({ title, objId, showModal, closePopupFunc }) => {
    const [data, setData] = useState([])
    //  const [properName, setProperName] = useState([])
    const handleClosePopUp = () => {
        if (closePopupFunc) {
            closePopupFunc()
        }
    }

    useEffect(() => {
        fetchAssetInfo()
    }, [objId])

    const fetchAssetInfo = async () => {
        Loading.standard("Loading...");
        await AssetService.getAssetById(objId).then((res) => {
            setData(res.data)
            console.log(res.data);
            Loading.remove();
        }, (err) => {
            console.log(err.toString());
            Loading.remove();
        })
    }

    const isObject = (objValue) => {
        return objValue && typeof objValue === 'object' && objValue.constructor === Object;
    }




    return (
        <Modal show={showModal} onHide={handleClosePopUp} size="lg" backdrop='static' keyboard={false} style={{ width: '100%', wordWrap:'break-word' }}>
            <Modal.Header closeButton style={{ color: '#cf2338', backgroundColor: 'lightgrey' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row' style={{ marginLeft: 20, marginTop: 10 }}>
                    <p className='col-3'>Asset Code</p>
                    <p className='col-7'>{data.id}</p>
                </div>
                <div className='row' style={{ marginLeft: 20, marginTop: 10 }}>
                    <p className='col-3'>Asset Name</p>
                    <p className='col-7'>{data.name}</p>
                </div>
                <div className='row' style={{ marginLeft: 20, marginTop: 10 }}>
                    <p className='col-3'>Category</p>
                    <p className='col-7'>{data.categoryName}</p>
                </div>
                <div className='row' style={{ marginLeft: 20, marginTop: 10 }}>
                    <p className='col-3'>Installed Date</p>
                    <p className='col-7'><Moment date={data.installedDate} format="DD/MM/YYYY" /> </p>
                </div>
                <div className='row' style={{ marginLeft: 20, marginTop: 10 }}>
                    <p className='col-3'>State</p>
                    <p className='col-7'>{data.state}</p>
                </div>
                <div className='row' style={{ marginLeft: 20, marginTop: 10 }}>
                    <p className='col-3'>Location</p>
                    <p className='col-7'>{data.location}</p>
                </div>
                <div className='row' style={{ marginLeft: 20, marginTop: 10 }}>
                    <p className='col-3'>Specification</p>
                    <p className='col-7'>{data.specification}</p>
                </div>
                <div className='row' style={{ marginLeft: 20, marginTop: 10 }}>
                    <p className='col-3'>History</p>
                    <p className='col-9'>
                        {data?.returningDtoList?.length > 0 ?
                            < div class="table-listing">
                                <table >
                                    <thead>
                                        <tr style={{ marginRight: 50 }}>
                                            {cols.map((item, index) =>
                                                <th class="border-bottom border-3" key={index} style={{ cursor: 'pointer' }}>{item.name} </th>
                                            )}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data &&
                                            Object.values(data.returningDtoList).map((item, index) =>
                                                <tr key={index}>
                                                    <th class="border-bottom border-3 border-right" style={{ width: "7rem" }}><Moment date={item?.assignmentResponseDto?.createdWhen} format="DD/MM/YYYY" />  </th>
                                                    <th class="border-bottom border-3" style={{ width: "7rem" }}>{item.assignTo} </th>
                                                    <th class="border-bottom border-3" style={{ width: "7rem" }}>{item.assignBy} </th>
                                                    <th class="border-bottom border-3" style={{ width: "7rem" }}><Moment date={item?.returnedDate} format="DD/MM/YYYY" /> </th>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div> : <></>
                        }
                    </p>
                </div>
            </Modal.Body >
        </Modal >
    );
}

export default ModalInfoAsset;
