import React from 'react';
import { Modal } from 'react-bootstrap';

const CompleteConfirm = ({ title, message, showModal, closePopupFunc, yesFunc, yesBtnName }) => {

    const handleClose = () => {
        if (closePopupFunc) {
            closePopupFunc()
        }
    }

    const handleYes = () => {
        if (yesFunc) {
            yesFunc()
        }
    }

    return (
        <Modal show={showModal} onHide={handleClose} size="lg" backdrop='static' keyboard={false} size="md">
            <Modal.Header closeButton style={{ color: '#cf2338', backgroundColor: 'lightgrey' }}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{ marginTop: 20, marginBottom: 20 }}>
                    <div>{message}</div>
                    <div className="button mt-3">
                        <button
                            className="btn btn-danger px-3 me-3"
                            id="yes-button"
                            onClick={handleYes}
                        >
                            {yesBtnName}
                        </button>
                        <button
                            className="btn btn-outline-secondary px-3"
                            id="no-button"
                            onClick={handleClose}
                        >
                            No
                        </button>
                    </div>
                </div>
            </Modal.Body >
        </Modal >
    );
}

export default CompleteConfirm;