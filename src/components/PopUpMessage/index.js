import React from 'react';
import { Modal } from 'react-bootstrap';

const PopUpMessage = ({ title, message, showModal, closePopupFunc }) => {

    const handleClose = () => {
        if (closePopupFunc) {
            closePopupFunc()
        }
    }



    return (
        <Modal show={showModal} onHide={handleClose} size="lg" backdrop='static' keyboard={false} size="md">
            <Modal.Header closeButton style={{ color: '#cf2338', backgroundColor: 'lightgrey' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ marginTop: 20, marginBottom: 20, display: 'flex' }}>
                    <pre>{message}</pre>
                </div>
            </Modal.Body>
        </Modal >
    );
}

export default PopUpMessage;