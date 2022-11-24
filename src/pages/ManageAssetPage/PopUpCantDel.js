import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";

const PopUpCantDel = ({ title, showModal, closePopupFunc, id }) => {

    const handleClose = () => {
        if (closePopupFunc) {
            closePopupFunc()
        }
    }



    return (
        <Modal show={showModal} onHide={handleClose} size="lg" backdrop='static' keyboard={false} size="md" >
            <Modal.Header closeButton style={{ color: '#cf2338', backgroundColor: 'lightgrey' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ marginTop: 20}}>
                    <p>Cannot delete the asset because it belongs to one or more historical assignments.</p>
                    <p> If the asset is not able to be used anymore, please update its state in <Link to={`/edit-asset/${id}`}>Edit Asset page</Link></p>
                </div>
            </Modal.Body>
        </Modal >
    );
}

export default PopUpCantDel;