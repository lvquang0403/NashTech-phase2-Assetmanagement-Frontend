import React from "react";
import { useState } from "react";
import Moment from "react-moment";
import {
  FaCaretDown,
  FaCheck,
  BsXCircle,
  FaUndoAlt,
} from "../../components/icon";
import PopUpConfirm from "../../components/PopUpConfim";

const MyAssignmentTable = ({
  cols,
  data,
  actions,
  sortFunc,
  onClickRecordFunc,
  onClickAccepFunc,
  onClickDelBtn
}) => {
  // show popup
  const [isOpenReturn, setOpenReturn] = useState(false);
  const [isOpenTickIcon, setOpenTickIcon] = useState(false);
  const [isOpenXIcon, setOpenXIcon] = useState(false);

  // save id for create request for returning asset
  const [assignmentId, setAssignmentId] = useState(undefined);

  const handleSort = (col) => {
    if (sortFunc) {
      sortFunc(col);
    }
  };

  const handleOnClickRecord = (obj) => {
    if (onClickRecordFunc && obj.id != undefined) {
      console.log(obj.state);
      if (obj.state === "Accepted") {
        onClickRecordFunc(obj.id);
        console.log(obj.id);
      }
    }
  };
  const handleCloseModal = () => {
    setOpenReturn(false);
    setOpenTickIcon(false);
    setOpenXIcon(false);
  };

  const handleOpenModalDecline = (id) => {
    setOpenXIcon(true)
    setAssignmentId(id)
  };

  const handleOpenModalAccept = (id) => {
    setOpenTickIcon(true)
    setAssignmentId(id)
  };

  const handleStateAssignmentChange = async (state) => {
    if (onClickAccepFunc) {
      onClickAccepFunc(assignmentId, state);
      handleCloseModal()

    }
  }


  // When click return incon 
  const handleClickIconReturn = (id) => {
    setOpenReturn(true)
    setAssignmentId(id)
  };

  // When click button 'yes' in  popup for creating returning request
  const handleCreateReturningRequest = () => {
    handleCloseModal();
    if (onClickDelBtn && assignmentId !== undefined) {
      onClickDelBtn(assignmentId)
    }
  };

  return (
    <div class="table-listing">
      <table>
        <thead>
          <tr>
            {cols.map((item, index) => (
              <th
                class="border-bottom border-3"
                key={index}
                onClick={() => handleSort(item.name)}
                style={{ cursor: "pointer", whiteSpace: "nowrap" }}
              >
                {item.name}
                {item.isDropdown && (
                  <FaCaretDown style={{ cursor: "pointer", marginLeft: 5 }} />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            Object.values(data).map((obj, index) => (
              <tr key={index} style={{ cursor: "pointer" }}>
                <td
                  onClick={() => handleOnClickRecord(obj)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  {obj.assetId}
                </td>
                <td
                  onClick={() => handleOnClickRecord(obj)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  {obj.assetName}
                </td>
                <td
                  onClick={() => handleOnClickRecord(obj)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  {obj.category}
                </td>

                <td
                  onClick={() => handleOnClickRecord(obj)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  <Moment date={obj.assignedDate} format="DD/MM/YYYY" />
                </td>
                <td
                  onClick={() => handleOnClickRecord(obj)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {obj.state}
                </td>
                {actions && (
                  <td style={{ whiteSpace: "nowrap" }}>
                    {actions.accept && (
                      <FaCheck
                        style={{
                          color: "red",
                          cursor: "pointer",
                          marginLeft: 15,
                          opacity: obj.state === "Accepted" ? "0.3" : "1",
                        }}
                        onClick={() =>
                          obj.state === "Accepted"
                            ? null
                            : handleOpenModalAccept(obj.id)
                        }
                      />
                    )}
                    {actions.deny && (
                      <BsXCircle
                        style={{
                          cursor: "pointer",
                          marginLeft: 15,
                          color: "black",
                          opacity: obj.state === "Accepted" ? "0.3" : "1",
                        }}
                        onClick={() =>
                          obj.state === "Accepted"
                            ? null
                            : handleOpenModalDecline(obj.id)
                        }

                      />
                    )}
                    {actions.return && (
                      <FaUndoAlt
                        style={{
                          cursor: (obj.requestForReturn || obj.state !== 'Accepted')?"default":"pointer",
                          marginLeft: 15,
                          color: "blue",
                          opacity: (obj.requestForReturn || obj.state !== 'Accepted')?0.3:1
                        }}
                        onClick={() => {
                          if(!obj.requestForReturn && obj.state === 'Accepted'){
                            handleClickIconReturn(obj.id)
                          }
                        }}
                      />
                    )}
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
      {/* US-1649 popup for creating returning request */}
      <PopUpConfirm
        showModal={isOpenReturn}
        closePopupFunc={handleCloseModal}
        yesFunc={handleCreateReturningRequest}
        title="Are you sure?"
        message="Do you want to create a returning request for this asset?"
        yesBtnName="Yes"
        cancelBtnName="No"
      />

      {/*US-1651 [Tick Icon] popup for respond to his/her own assignments */}
      <PopUpConfirm
        showModal={isOpenTickIcon}
        closePopupFunc={handleCloseModal}
        yesFunc={() => handleStateAssignmentChange("ACCEPTED")}
        title="Are you sure?"
        message="Do you want to accept this assignment?"
        yesBtnName="Accept"

      />
      {/*US-1651 [X Icon] popup for respond to his/her own assignments */}
      <PopUpConfirm
        showModal={isOpenXIcon}
        closePopupFunc={handleCloseModal}
        yesFunc={() => handleStateAssignmentChange("DECLINED")}
        title="Are you sure?"
        message="Do you want to decline this assignment?"
        yesBtnName="Decline"

      />
    </div>
  );
};

export default MyAssignmentTable;
