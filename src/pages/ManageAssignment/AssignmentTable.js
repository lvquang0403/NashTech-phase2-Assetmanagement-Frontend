import React from "react";
import Moment from "react-moment";
import { FaCaretDown, FaPen, BsXCircle } from "../../components/icon";

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
    if (onClickRecordFunc && id != undefined) {
      onClickRecordFunc(id);
      console.log(id);
    }
  };
  const handleOnEditBtn = (id) => {
    if (onClickEditBtnFunc && id != undefined) {
      onClickEditBtnFunc(id);
      console.log(id);
    }
  };
  const handleDelBtn = (id) => {
    if (onClickDelBtn && id != undefined) {
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
                  {obj.assetCode}
                </td>
                <td
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
                  {obj.assignedTo}
                </td>
                <td
                  onClick={() => handleOnClickRecord(obj.id)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  {obj.assignedBy}
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
                >
                  {obj.state}
                </td>
                {actions && (
                  <td>
                    {actions["edit"] && (
                      <FaPen
                        style={{
                          cursor: "pointer",
                          marginLeft: 15,
                          opacity: obj.state === "Assigned" ? "0.3" : "1",
                        }}
                        onClick={() =>
                          obj.state === "Assigned"
                            ? null
                            : handleOnEditBtn(obj.id)
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
                        onClick={() => handleDelBtn(obj.id)}
                      />
                    )}
                    {actions.return && <>ret</>}
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
