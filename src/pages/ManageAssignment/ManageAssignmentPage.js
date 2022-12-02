import React from "react";
import ReactPaginate from "react-paginate";
import AssignmentTable from "./AssignmentTable";
import queryString from "query-string";
import SearchInput from "../../components/SearchInput/index";
import AssingementService from "../../services/AssignmentService";
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";

import { Loading } from "notiflix/build/notiflix-loading-aio";
import { useRef } from "react";
import { useState } from "react";
import { FaCalendar, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ModalAssignmentInfo from "./ModalAssignmentInfo";
import getLocationInSession from "../../utils/getLocationInSession";

const ManageAssignmentPage = () => {
  const cols = [
    { name: "No.", isDropdown: false },
    { name: "Asset Code", isDropdown: true },
    { name: "Asset Name", isDropdown: true },
    { name: "Assigned To", isDropdown: true },
    { name: "Assigned By", isDropdown: true },
    { name: "Assigned Date", isDropdown: true },
    { name: "State", isDropdown: true },
  ];

  const navigate = useNavigate();
  const typingTimeOutRef = useRef(null);
  const [allState, setAllState] = useState(false);
  const [currentNo, setCurrentNo] = useState(0);
  const calendarIcon = <FaCalendar />;

  const [assignmentList, setAssignmentList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [input, setInput] = useState("");
  //filter
  const [searchFilter, setSearchFilter] = useState("");
  const [stateFilter, setStateFilter] = useState([
    "Accepted",
    "Waiting for acceptance",
  ]);
  const [orderBy, setOrderBy] = useState();

  //header table
  const [currentSortCol, setCurrentCol] = useState("");

  //paging
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  //id asset to show detail asset
  const [assignmentId, setAssignmentId] = useState();

  const [isOpen, setOpen] = useState(false);
  const [isOpenDel, setOpenDel] = useState(false);
  const [isOpenMess, setOpenMess] = useState(false);
  const [message, setMessage] = useState("");
  const [assignedDate, setAssignedDate] = useState(undefined);

  const [isDel, setDel] = useState(false);
  const fetchAssignment = async () => {
    Loading.standard("Loading...");
    // check location id
    var assignedDateString = undefined;
    if (assignedDate !== undefined) {
      assignedDateString = moment(assignedDate).format("YYYY-MM-DD");
      console.log(assignedDateString);
      console.log(assignedDate);
    }
    console.log(assignedDate);

    const filter = {
      page: currentPage,
      keyword: searchFilter,
      states: stateFilter.length === 0 ? undefined : stateFilter,
      orderBy: orderBy,
      assignDate: assignedDateString,
    };
    console.log(assignedDateString);
    console.log(assignedDate);

    let predicates = queryString.stringify(filter);
    console.log(predicates);
    await AssingementService.getAllAssignments(predicates).then(
      (res) => {
        setAssignmentList(res.data.listResponse);
        if (res.data.listResponse != null) {
          setTotalPage(res.data.totalPage);
        }
        Loading.remove();
      },
      (err) => {
        console.log(err.toString());
        Loading.remove();
      }
    );
    //Loading.remove();
  };

  const fetchStates = async () => {
    setStateList(["Accepted", "Waiting for acceptance", "Declined"]);
  };

  const sortByCol = (col) => {
    if (col === currentSortCol) {
      // if click same column
      setCurrentCol(""); // reset currentCol
    } else {
      // if click new column
      setCurrentCol(col); // set currentCol
    }
    const data = [...assignmentList];

    switch (col) {
      case "Asset Code":
        col === currentSortCol
          ? setOrderBy("asset.id_DESC")
          : setOrderBy("asset.id_ASC");
        break;
      case "Asset Name":
        col === currentSortCol
          ? setOrderBy("asset.name_DESC")
          : setOrderBy("asset.name_ASC");
        break;

      case "Assigned To":
        col === currentSortCol
          ? setOrderBy("assignedTo.username_DESC")
          : setOrderBy("assignedTo.username_ASC");
        break;

      case "Assigned By":
        col === currentSortCol
          ? setOrderBy("assignedBy.username_DESC")
          : setOrderBy("assignedBy.username_ASC");
        break;

      case "Assigned Date":
        col === currentSortCol
          ? setOrderBy("assignedDate_DESC")
          : setOrderBy("assignedDate_ASC");
        break;

      case "State":
        col === currentSortCol
          ? setOrderBy("state_DESC")
          : setOrderBy("state_ASC");
        break;

      default:
        break;
    }
  };

  const actions = {
    edit: true,
    remove: true,
    return: true,
  };

  const handleAssignedDateChange = (date) => {
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      if (date === null) {
        setAssignedDate(undefined);
      }
      setAssignedDate(date);
    }, 1000);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setOpenDel(false);
    setOpenMess(false);
  };

  const handlePageChange = (e) => {
    const { selected } = e;
    setCurrentPage(selected);
  };

  useEffect(() => {
    if (currentPage === 0) {
      setCurrentNo(0);
    } else {
      setCurrentNo(currentPage * 15);
    }
  }, [currentPage]);

  const handleOpenModal = (id) => {
    setAssignmentId(id);
    setOpen(true);
  };

  const handleEditBtn = (id) => {
    navigate("/edit-assignment/" + id);
  };

  const handleInputChange = (newValue) => {
    var temp = newValue;
    setInput(temp);

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setSearchFilter(temp);
      setOrderBy(null);
      setCurrentPage(0);
    }, 500);
  };

  const handleStatesChange = (val) => {
    if (val === "All") {
      var temp = allState ? false : true;
      if (temp) {
        setAllState(temp);
        setStateFilter(stateList);
      } else {
        setAllState(temp);
        setStateFilter([]);
      }
    } else {
      let isExisted = stateFilter.findIndex((item) => item === val);
      if (isExisted > -1) {
        let tempList = [...stateFilter];
        tempList.splice(isExisted, 1);
        setStateFilter(tempList);
      } else {
        let tempList = [...stateFilter];
        tempList.push(val);
        setStateFilter(tempList);
      }
    }
  };

  useEffect(() => {
    //Loading.standard("Loading...");
    fetchAssignment();
    fetchStates();
  }, [currentPage, stateFilter, searchFilter, orderBy, isDel, assignedDate]);

  // useEffect(() => {
  //   typingTimeOutRef.current = setTimeout(() => {

  //     fetchAssignment();
  //     fetchStates();

  //   }, 5000);
  // }, []);

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
                  State
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
                        checked={allState === true}
                        onChange={() => handleStatesChange("All")}
                      />
                      <label className="form-check-label">All</label>
                    </div>
                  </li>
                  {stateList.map((i, index) => (
                    <li key={index}>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={i}
                          checked={
                            stateFilter.findIndex((item) => item === i) > -1
                          }
                          onChange={() => handleStatesChange(i)}
                        />
                        <label className="form-check-label" htmlFor={i}>
                          {i}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AssignedDate */}
              <div>
                <div>
                  <DatePicker
                    className="btn btn-outline-secondary dropdown-toggle"
                    dateFormat="dd/MM/yyyy"
                    selected={assignedDate}
                    onChange={(date) => handleAssignedDateChange(date)}
                    placeholderText="Assigned Date    🗓️"
                  />
                </div>
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
                  navigate("/manage-assignment/create-assignment");
                }}
              >
                Create new assignment
              </button>
            </div>
          </div>
        </div>
        {/* <Table
          cols={cols}
          data={assignmentList}
          actions={actions}
          sortFunc={sortByCol}
          onClickRecordFunc={handleOpenModal}
          // onClickEditBtnFunc={handleEditBtn}
          // onClickDelBtn={handleDelBtn}
        /> */}
        <AssignmentTable
          cols={cols}
          data={assignmentList}
          actions={actions}
          sortFunc={sortByCol}
          onClickRecordFunc={handleOpenModal}
          currentNo={currentNo}
          onClickEditBtnFunc={handleEditBtn}
          // onClickDelBtn={handleDelBtn}
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
          forcePage={currentPage}
          disabledClassName="page-disable"
          pageLinkClassName="page-num"
          previousLinkClassName="page-pre"
          nextLinkClassName="page-next"
          activeLinkClassName="active"
        />

        <ModalAssignmentInfo
          title="Detailed Assignmnet Infomation"
          showModal={isOpen}
          closePopupFunc={handleCloseModal}
          objId={assignmentId}
        />
        {/* <PopUpConfirm
          showModal={isOpenDel}
          closePopupFunc={handleCloseModal}
          yesFunc={handleDisableUser}
          title="Are you sure?"
          message="Do you want to disable this user?"
          yesBtnName="Disable"
        /> */}
        {/* <PopUpMessage
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
