import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUpChangePass from "../PopUpChangePass";
import PopUpConfirmLogout from "../modal/ConfirmLogout";
import UserService from '../../services/UserService';
import "./header.scss";
import { Modal } from 'react-bootstrap';

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Username");
  const [showConfirmLogout, setShowConfirmLogout] = useState(false)


  const [openModelChangePass, setOpenModelChangePass] = useState(false);
  const [openModelMess, setModelMess] = useState(false);


  console.log(showConfirmLogout)
  const handleCloseModal = () => {
    setOpenModelChangePass(false)
    setModelMess(false)
  }


  useEffect(() => {

  }, []);
  return (
    <>
      <div className="header">
        <div className="header__title">Header Manager User</div>
        <div className="header__username " id="user_header">
          <div className="btn-group">
            <button
              type="button"
              class="btn btn-error dropdown-toggle dropdown-toggle-split my-auto"
              id="dropdownMenuReference"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-reference="parent"
            >
              <span className="mx-2" style={{ color: 'white', fontWeight: 'bold' }}>{username}</span>
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="dropdownMenuReference"
            >
              <li
                className="dropdown-item"
                id="li-bottom"
                onClick={() => setOpenModelChangePass(true)}
              >
                Change password
              </li>
              <li
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#logoutModal"
                onClick={() => setShowConfirmLogout(true)}
              >
                Log out
              </li>

            </ul>
          </div>
          <PopUpChangePass showModal={openModelChangePass} closePopupFunc={handleCloseModal} title="Change Password" openModalSuccessFunc={() => setModelMess(true)} />

          <Modal show={openModelMess} onHide={handleCloseModal} size="lg" backdrop='static' keyboard={false} size="md">
            <Modal.Header closeButton style={{ color: '#cf2338', backgroundColor: 'lightgrey' }}>
              <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginTop: 10 }}>
                <pre>Your password has been changed successfully!</pre>
                <div className="btn-group-footer d-flex justify-content-end" >

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    id="cancel-button"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal >
          <PopUpConfirmLogout show={showConfirmLogout} setShow={setShowConfirmLogout} />

        </div>

      </div>
    </>
  );
};

export default Header;
