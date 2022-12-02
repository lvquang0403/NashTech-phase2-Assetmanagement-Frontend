import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Moment from "react-moment";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import AssignmentService from "../../services/AssignmentService";

const ModalAssignmentInfo = ({ title, objId, showModal, closePopupFunc }) => {
  const [data, setData] = useState([]);

  const handleClosePopUp = () => {
    if (closePopupFunc) {
      closePopupFunc();
    }
  };

  useEffect(() => {
    if (objId) {
      fetchUserInfo();
    }
  }, [objId]);

  const fetchUserInfo = async () => {
    Loading.standard("Loading...");
    await AssignmentService.getAssignmentById(objId).then(
      (res) => {
        setData(res.data);
        console.log(res);
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
      style={{ width: "100%", wordWrap: "break-word" }}
    >
      <Modal.Header
        closeButton
        style={{ color: "#cf2338", backgroundColor: "lightgrey" }}
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Asset Code</p>
          <p className="col-7">{data.assetId}</p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Asset Name</p>
          <p className="col-7">{data.assetName}</p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Specification</p>
          <p className="col-7">{data.specification}</p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Assinged To</p>
          <p className="col-7">{data.assignToUsername}</p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Assinged By</p>
          <p className="col-7">{data.assignByUsername}</p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Assigned Date</p>
          <p className="col-7">
            <Moment date={data.assignedDate} format="DD/MM/YYYY" />
          </p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">State</p>
          <p className="col-7">{data.state}</p>
        </div>
        <div className="row" style={{ marginLeft: 20, marginTop: 10 }}>
          <p className="col-4">Note</p>
          <p className="col-7">{data.note}</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalAssignmentInfo;
