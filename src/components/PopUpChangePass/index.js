import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

const PopUpChangePass = ({ title, showModal, closePopupFunc, yesFunc }) => {
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClose = () => {
        if (closePopupFunc) {
            closePopupFunc()
        }
    }

    const handleSave = () => {
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
                <div className="modal-body">
                    <div className="mx-0 mx-md-3 mx-lg-5 my-2">
                        <div className="old-password w-100 d-flex justify-content-between ">
                            <label htmlFor="old-pass" className="">
                                Old Password
                            </label>
                            <div className="d-flex flex-column">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="old-pass"
                                // value={oldPassword}
                                // className={
                                //     error
                                //         ? "border border-danger rounded"
                                //         : "border rounded"
                                // }
                                // onChange={(e) => setOldPassword(e.target.value)}
                                // onFocus={() => setError("")}
                                />
                                {!showPassword ? (
                                    <AiFillEye
                                        onClick={() => setShowPassword(true)}
                                    ></AiFillEye>
                                ) : (
                                    <AiFillEyeInvisible
                                        onClick={() => setShowPassword(false)}
                                    ></AiFillEyeInvisible>
                                )}
                                {/* {error && <p className="text-danger fs-6">{error}</p>} */}
                            </div>
                        </div>

                        <div className="new-password  w-100 d-flex justify-content-between mt-3">
                            <label htmlFor="new-pass" className="pe-3">
                                New Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="new-pass"
                                className="border rounded"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            // onFocus={() => setError("")}
                            />
                            {!showPassword ? (
                                <AiFillEye
                                    onClick={() => setShowPassword(true)}
                                ></AiFillEye>
                            ) : (
                                <AiFillEyeInvisible
                                    onClick={() => setShowPassword(false)}
                                ></AiFillEyeInvisible>
                            )}
                        </div>
                        <br />
                        <div className="btn-group-footer d-flex justify-content-end">
                            <button
                                 className="btn btn-danger"
                                 id="disable-button"
                                onClick={handleSave}
                            //disabled={!(oldPassword && newPassword)}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                id="cancel-button"
                         
                   
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </Modal.Body >
        </Modal >
    );
}

export default PopUpChangePass;