import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Moment from "react-moment";
import UserService from "../../services/UserService";
import { Loading } from "notiflix/build/notiflix-loading-aio";

const ModalUserInfo = ({ title, objId, showModal, closePopupFunc }) => {
  const [data, setData] = useState([]);

  const handleClosePopUp = () => {
    if (closePopupFunc) {
      closePopupFunc();
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [objId]);

  const fetchUserInfo = async () => {
    Loading.standard("Loading...");
    await UserService.getUserById(objId).then(
      (res) => {
        setData(res.data);
        Loading.remove();
      },
      (err) => {
        console.log(err.toString());
        Loading.remove();
      }
    );
  };

  return (
    <Modal
      show={showModal}
      onHide={handleClosePopUp}
      size="lg"
      backdrop="static"
      keyboard={false}
      style={{ width: "100%", wordWrap:'break-word'  }}
    >
      <Modal.Header
        closeButton
        style={{ color: "#cf2338", backgroundColor: "lightgrey" }}
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Staff Code</p>
          <p className="col-7">{data.id}</p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Full Name</p>
          <p className="col-7">
            {data.firstName} {data.lastName}
          </p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Username</p>
          <p className="col-7">{data.username}</p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Date Of Birth</p>
          <p className="col-7">
            <Moment date={data.birth} format="DD/MM/YYYY" />{" "}
          </p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Gender</p>
          <p className="col-7">{data.gender}</p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Joined Date</p>
          <p className="col-7">
            <Moment date={data.joinedDate} format="DD/MM/YYYY" />
          </p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Type</p>
          <p className="col-7">{data?.role?.name}</p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Location</p>
          <p className="col-7">{data?.location?.cityName}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalUserInfo;
