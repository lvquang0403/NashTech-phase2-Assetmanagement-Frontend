import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { FaCaretDown, FaPen, BsXCircle } from "../../components/icon";

const TableUser = ({
  cols,
  data,
  actions,
  sortFunc,
  onClickRecordFunc,
  onClickEditBtnFunc,
  onClickDelBtn,
}) => {
  const [userId, setUserId] = useState();

  const handleSort = (col) => {
    if (sortFunc) {
      sortFunc(col);
    }
  };

  const handleOnClickRecord = (id) => {
    if (onClickRecordFunc && id != undefined) {
      onClickRecordFunc(id);
      //console.log(id);
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

  const getUserIdInSession = () => {};

  useEffect(() => {
    const userJson = window.sessionStorage.getItem("user");
    setUserId(JSON.parse(userJson).id);
    console.log(JSON.parse(userJson).id);
  }, []);

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
                  {obj.id}
                </td>
                <td
                  onClick={() => handleOnClickRecord(obj.id)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  {obj.fullName}
                </td>
                <td
                  onClick={() => handleOnClickRecord(obj.id)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  {obj.userName}
                </td>
                <td
                  onClick={() => handleOnClickRecord(obj.id)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  <Moment date={obj.joinedDate} format="DD/MM/YYYY" />
                </td>
                <td
                  onClick={() => handleOnClickRecord(obj.id)}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  {obj.role}
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
                          opacity: obj.id == userId ? "0.3" : "1",
                        }}
                        onClick={
                          obj.id == userId ? null : () => handleDelBtn(obj.id)
                        }
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

export default TableUser;
