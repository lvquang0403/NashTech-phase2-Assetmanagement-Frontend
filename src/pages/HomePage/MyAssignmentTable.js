import React from "react";
import Moment from "react-moment";
import {
  FaCaretDown,
  FaCheck,
  BsXCircle,
  FaUndoAlt,
} from "../../components/icon";

const MyAssignmentTable = ({
  cols,
  data,
  actions,
  sortFunc,
  onClickRecordFunc,
  onClickAccepFunc,
  onClickDenyBtn,
}) => {
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

  const handleDeniedBtn = (id) => {};

  const handleAcceptBtn = (id) => {};

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
                        // onClick={() => handleDelBtn(obj.id)}
                      />
                    )}
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAssignmentTable;
