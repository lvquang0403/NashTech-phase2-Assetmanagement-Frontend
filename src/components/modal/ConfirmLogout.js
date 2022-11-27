import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const PopUpConfirmLogout = ({ show, setShow }) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        sessionStorage.clear();
        setShow(false)
        navigate("/login")
    } 

    return (
        <div
            className={"modal fade " + (show ? "show d-block bg-dark p-2 text-dark bg-opacity-50" : " d-none")}
            tabIndex="-1"
            role="dialog"
            // style={{opacity:"0.5"}}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content modal-sm  border border-dark">
                    <div className="modal-header" style={{ color: '#cf2338', backgroundColor: 'lightgrey' }}>
                        <h5 className="modal-title text-danger">Are you sure ?</h5>
                    </div>
                    <div className="modal-body">
                        <div className="text  ms-3 mb-3 float-left">
                            <h6>
                                Do you want to log out ?
                            </h6>
                        </div>
                        <div className="button-save mt-2 ">
                            <button style={{marginLeft: "16px"}}
                                type="button"
                                className="btn btn-danger "
                                onClick={() => handleLogout()}
                            >
                                Log out
                            </button>
                            <button style={{marginLeft: "12px"}}
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShow(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpConfirmLogout
