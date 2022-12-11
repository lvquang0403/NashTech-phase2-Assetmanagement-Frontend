import React from "react";
import Moment from "react-moment";
import { FaCaretDown, BsXCircle, FaCheck } from "../../components/icon";

const RequestTable = ({
  cols,
  data,
  actions,
  sortFunc,
  onClickCompleteFunc,
  onClickCancelBtn,
  currentNo,
}) => {
  const handleSort = (col) => {
    if (sortFunc) {
      sortFunc(col);
    }
  };
  const handleCompleteBtn = (id) => {
    console.log(id);

    if (onClickCompleteFunc && id !== undefined) {
      onClickCompleteFunc(id);
    }
  };
  const handleCancelBtn = (id) => {
    if (onClickCancelBtn && id !== undefined) {
      onClickCancelBtn(id);
      console.log(id);
    }
  };
  console.log(currentNo);
  console.log(data)
  return (
    <div class="table-listing">
      <table>
        <thead>
          <tr style={{ whiteSpace: "nowrap" }}>
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
                <td className="border-bottom" data-bs-toggle="modal">
                  {index + 1 + currentNo}
                </td>
                <td className="border-bottom" data-bs-toggle="modal">
                  {obj.assetViewResponseDto.id}
                </td>
                <td className="border-bottom" data-bs-toggle="modal">
                  {obj.assetViewResponseDto.name}
                </td>

                <td className="border-bottom" data-bs-toggle="modal">
                  {obj.requestedBy}
                </td>
                <td className="border-bottom" data-bs-toggle="modal">
                  <Moment
                    date={obj.assignmentResponseDto.assignedDate}
                    format="DD/MM/YYYY"
                  />
                </td>
                <td className="border-bottom" data-bs-toggle="modal">
                  {obj.acceptedBy}
                </td>
                <td className="border-bottom" data-bs-toggle="modal">
                  {obj.returnedDate === null ? (
                    ""
                  ) : (
                    <Moment date={obj.returnedDate} format="DD/MM/YYYY" />
                  )}
                </td>
                <td
                  style={{ whiteSpace: "nowrap" }}
                  className="border-bottom"
                  data-bs-toggle="modal"
                >
                  {obj.state}
                </td>
                {actions && (
                  <td style={{ whiteSpace: "nowrap" }}>
                    {actions.complete && (
                      <FaCheck
                        style={{
                          cursor: "pointer",
                          marginLeft: 15,
                          color: "red",
                          opacity:
                            obj.state !== "Waiting for returning" ? "0.3" : "1",
                        }}
                        onClick={() =>
                          obj.state === "Waiting for returning"
                            ? handleCompleteBtn(obj.id)
                            : null
                        }
                      />
                    )}
                    {actions.cancel && (
                      <BsXCircle
                        style={{
                          cursor: "pointer",
                          marginLeft: 15,
                          color: "black",
                          opacity:
                            obj.state !== "Waiting for returning" ? "0.3" : "1",
                        }}
                        onClick={() =>
                          obj.state === "Waiting for returning"
                            ? handleCancelBtn(obj.id)
                            : null
                        }
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

export default RequestTable;
