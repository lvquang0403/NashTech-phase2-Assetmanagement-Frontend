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
  onClickDenyBtn,
}) => {
// show popup
  const [isOpenReturn, setOpenReturn]= useState(false);
  const [isOpenTickIcon, setOpenTickIcon]= useState(false);
  const [isOpenXIcon, setOpenXIcon]= useState(false);

  // save id for create request for returning asset
  const [idReturnRequest, setIdReturnRequest]= useState(undefined);


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
    setOpenReturn(false)
    setOpenTickIcon(false)
    setOpenXIcon(false)
  };

  const handleDeniedBtn = (id) => {};

  const handleAcceptBtn = (id) => {};

  // When click return incon 
  const handleCreateRequest  = (id) => {
    setOpenReturn(true)
    setIdReturnRequest(id)
  };
  
  // When click button 'yes' in  popup for creating returning request
  const handleCreateReturningRequest  = () => {
    console.log(idReturnRequest);
    
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
                style={{ cursor: "pointer" }}
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
                >
                  {obj.state}
                </td>
                {actions && (
                  <td>
                    {actions.accept && (
                      <FaCheck
                        style={{
                          color: "red",
                          cursor: "pointer",
                          marginLeft: 15,
                          opacity: obj.state === "Assigned" ? "0.3" : "1",
                        }}
                        // onClick={() =>
                        //   obj.state === "Assigned"
                        //     ? null
                        //     : handleOnEditBtn(obj.id)
                        // }
                      />
                    )}
                    {actions.deny && (
                      <BsXCircle
                        style={{
                          cursor: "pointer",
                          marginLeft: 15,
                          color: "black",
                        }}
                        // onClick={() => handleDelBtn(obj.id)}
                      />
                    )}
                    {actions.return && (
                      <FaUndoAlt
                        style={{
                          cursor: "pointer",
                          marginLeft: 15,
                          color: "blue",
                        }}
                        onClick={() => handleCreateRequest(obj.id)}
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
          yesBtnName="Delete"
        />
        
      {/*US-1651 [Tick Icon] popup for respond to his/her own assignments */}
      <PopUpConfirm
          showModal={isOpenTickIcon}
          closePopupFunc={handleCloseModal}
          // yesFunc={handle}
          title="Are you sure?"
          message="Do you want to accept this assignment?"
          yesBtnName="Delete"
        />
      {/*US-1651 [X Icon] popup for respond to his/her own assignments */}
      <PopUpConfirm
          showModal={isOpenXIcon}
          closePopupFunc={handleCloseModal}
          // yesFunc={handle}
          title="Are you sure?"
          message="Do you want to decline this assignment?"
          yesBtnName="Delete"
        />
    </div>
  );
};

export default MyAssignmentTable;
