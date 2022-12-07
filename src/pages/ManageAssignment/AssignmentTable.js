import React from "react";
import Moment from "react-moment";
import {
  FaCaretDown,
  FaPen,
  BsXCircle,
  FaUndoAlt,
} from "../../components/icon";

const AssingmentTable = ({
  cols,
  data,
  actions,
  sortFunc,
  onClickRecordFunc,
  onClickEditBtnFunc,
  onClickDelBtn,
  currentNo,
}) => {
  const handleSort = (col) => {
    if (sortFunc) {
      sortFunc(col);
    }
  };

  const handleOnClickRecord = (id) => {
    if (onClickRecordFunc && id !== undefined) {
      onClickRecordFunc(id);
      console.log(id);
    }
  };
  const handleOnEditBtn = (id) => {
    console.log(id);

    if (onClickEditBtnFunc && id !== undefined) {
      onClickEditBtnFunc(id);
    }
  };
  const handleDelBtn = (id) => {
    if (onClickDelBtn && id !== undefined) {
      onClickDelBtn(id);
      console.log(id);
    }
  };
  console.log(currentNo);

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
                style={{ cursor: "pointer", whiteSpace: 'nowrap'}}
              
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
                  onClick={() => handleOnClickRecord(obj.id)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  {index + 1 + currentNo}
                </td>
                <td
                  onClick={() => handleOnClickRecord(obj.id)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  {obj.assetId}
                </td>
                <td
                  style={{ maxWidth: "500px" }}
                  onClick={() => handleOnClickRecord(obj.id)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                
                >
                  {obj.assetName}
                </td>

                <td
                  onClick={() => handleOnClickRecord(obj.id)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  {obj.assignTo}
                </td>
                <td
                  onClick={() => handleOnClickRecord(obj.id)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  {obj.assignBy}
                </td>
                <td
                  onClick={() => handleOnClickRecord(obj.id)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  <Moment date={obj.assignedDate} format="DD/MM/YYYY" />
                </td>
                <td
                  onClick={() => handleOnClickRecord(obj.id)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                  style={{whiteSpace: 'nowrap'}}
                >
                  {obj.state}
                </td>
                {actions && (
                  <td   style={{whiteSpace: 'nowrap'}}>
                    {actions["edit"] && (
                      <FaPen
                        style={{
                          cursor: "pointer",
                          marginLeft: 15,
                          opacity:
                            obj.state !== "Waiting for acceptance"
                              ? "0.3"
                              : "1",
                        }}
                        onClick={() =>
                          obj.state === "Waiting for acceptance"
                            ? handleOnEditBtn(obj.id)
                            : null
                        }
                      />
                    )}
                    {actions.remove && (
                      <BsXCircle
                        style={{
                          cursor: "pointer",
                          marginLeft: 15,
                          color: "red",
                        }}
                        // onClick={() => handleDelBtn(obj.id)}
                      />
                    )}
                    {actions.remove && (
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

export default AssingmentTable;
