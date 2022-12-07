import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUpChangePass from "../PopUpChangePass";
import PopUpConfirmLogout from "../modal/ConfirmLogout";
import UserService from '../../services/UserService';
import "./header.scss";
import { Modal } from 'react-bootstrap';
import { set } from "react-hook-form";

const Header = ({ title }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("Username");
  const [action, setAction] = useState(0);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false)


  const [openModelChangePass, setOpenModelChangePass] = useState(false);
  const [openModelMess, setModelMess] = useState(false);
  const [error, setError] = useState("")
  console.log(showConfirmLogout)
  const handleCloseModal = () => {
    setOpenModelChangePass(false)
    setModelMess(false)
  }
  useEffect(() => {
    if(window.sessionStorage.getItem('user')){
      const userJson = window.sessionStorage.getItem('user')
      const user = JSON.parse(userJson)
      setUser(user)
  }
  },[])
  useEffect(() => {

  }, []);
  console.log("after",title)
  return (
    <>
      <div className="header">
        <div className="header__title">{title}</div>
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
              <span className="mx-2" style={{ color: 'white', fontWeight: 'bold' }}>{user.firstName && (user.lastName + " " + user.firstName)}</span>
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
                onClick={()=>setShowConfirmLogout(true)}
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
              <div style={{ marginTop: 10, fontFamily: 'Segoe UI'}}>
                <p>Your password has been changed successfully!</p>
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
