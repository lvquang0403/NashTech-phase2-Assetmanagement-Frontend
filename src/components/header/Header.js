import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUpChangePass from "../PopUpChangePass";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Username");
  const [action, setAction] = useState(0);


  const [openModelChangePass, setOpenModelChangePass] = useState(false);
  const [openModelMess, setModelMess] = useState(false);


  const handleCloseModal = () => {
    setOpenModelChangePass(false)
    setModelMess(false)
  }

  const handleChangePass = () => {
    console.log("change");
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
                onClick={()=>setOpenModelChangePass(true)}
              >
                Change password
              </li>
              <li
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#logoutModal"
              >
                Logout
              </li>

            </ul>
          </div>
          <PopUpChangePass showModal={openModelChangePass} closePopupFunc={handleCloseModal} yesFunc={handleChangePass} title="Change Password" />


        </div>

      </div>
    </>
  );
};

export default Header;
