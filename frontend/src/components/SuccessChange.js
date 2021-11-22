import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

export const SuccessChange = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <>
         <Button variant="default" onClick={handleShow}>
                Change password
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><p class="h3 text-danger">Change password</p></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p class="m-auto" >Your password has been changed successfully!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
    </>
}