import React from 'react';
import { Modal } from 'react-bootstrap';

const PopUpConfirm = ({ title, showModal, closePopupFunc, yesFunc }) => {

    const handleClose = () => {
        if (closePopupFunc) {
            closePopupFunc()
        }
    }

    const handleDisable = () => {
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
                    <div>Do you want to disable user?</div>
                    <div className="button">
                        <button
                            className="btn btn-danger"
                            id="disable-button"
                            onClick={handleDisable}
                        >
                            Disable
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            id="cancel-button"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal.Body >
        </Modal >
    );
}

export default PopUpConfirm;