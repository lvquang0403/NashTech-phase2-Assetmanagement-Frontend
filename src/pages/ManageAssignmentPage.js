import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/SearchInput";

const ManageAssignmentPage = () => {
  const navigate = useNavigate();
  const typingTimeOutRef = useRef(null);
  const [input, setInput] = useState("");

  const handleInputChange = (newValue) => {
    var temp = newValue;
    setInput(temp);

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      // setOrderBy(null);
      // setCurrentPage(0);
      // setSearchFilter(temp);
    }, 500);
  };

  return (
    <>
      <div className="board-container">
        <div className="title">
          <h3>Assignment List</h3>
        </div>
        <div class="table-board">
          <div className="left-board">
            <div className="filter">
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropMenuFilterType"
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                >
                  Type
                  <div>
                    <FaFilter />
                  </div>
                </button>
                <ul
                  className="dropdown-menu form-check"
                  aria-labelledby="dropMenuFilterType"
                >
                  <li>
                    <div>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        // checked={allRole === true}
                        // onChange={() => handleRoleChange("All")}
                      />
                      <label className="form-check-label">All</label>
                    </div>
                  </li>
                  {/* {roleList.map((i, index) => (
                    <li key={index}>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          // value={i}
                          // checked={
                          //   roleFilter.findIndex((item) => item === i) > -1
                          // }
                          // onChange={() => handleRoleChange(i)}
                        />
                        <label className="form-check-label" htmlFor={i}>
                          {i}
                        </label>
                      </div>
                    </li>
                  ))} */}
                </ul>
              </div>

              {/* AssignedDate */}

              <div>
                <input
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="date"
                  placeholder="Assigned Date"
                ></input>
              </div>
            </div>
          </div>
          <div className="right-board">
            <SearchInput input={input} handleInputChange={handleInputChange} />
            <div className="button">
              <button
                type="button"
                className="btn btn-danger"
                id="btnCreateAsset"
                onClick={() => {
                  // navigate("/manage-user/create");
                }}
              >
                Create new User
              </button>
            </div>
          </div>
        </div>
        {/* <Table cols={cols} data={userList} actions={actions} sortFunc={sortByCol} onClickRecordFunc={handleOpenModal} onClickEditBtnFunc={handleEditBtn} onClickDelBtn={handleDelBtn} />
        <TableUser
          cols={cols}
          data={userList}
          actions={actions}
          sortFunc={sortByCol}
          onClickRecordFunc={handleOpenModal}
          onClickEditBtnFunc={handleEditBtn}
          onClickDelBtn={handleDelBtn}
        />
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageChange}
          pageRangeDisplayed={2}
          pageCount={totalPage}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          disabledClassName="page-disable"
          pageLinkClassName="page-num"
          previousLinkClassName="page-pre"
          nextLinkClassName="page-next"
          activeLinkClassName="active"
        />

        <ModalUserInfo
          title="Detailed User Infomation"
          showModal={isOpen}
          closePopupFunc={handleCloseModal}
          objId={userId}
        />
        <PopUpConfirm
          showModal={isOpenDel}
          closePopupFunc={handleCloseModal}
          yesFunc={handleDisableUser}
          title="Are you sure?"
          message="Do you want to disable this user?"
          yesBtnName="Disable"
        />
        <PopUpMessage
          showModal={isOpenMess}
          closePopupFunc={handleCloseModal}
          title="Can not disable user"
          message={message}
        /> */}
      </div>{" "}
    </>
  );
};

export default ManageAssignmentPage;
