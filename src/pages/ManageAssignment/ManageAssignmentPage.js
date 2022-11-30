import React from "react";
import Table from "../../components/Table";
import TableUser from "../ManageUserPage/TableUser";
import ReactPaginate from "react-paginate";
import ModalUserInfo from "../ManageUserPage/ModalUserInfo";
import AssingmentTable from "./AssignmentTable";
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
    { name: "No.", isDropdown: true },
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
  const calendarIcon = <FaCalendar />;

  const [assignmentList, setAssignmentList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [input, setInput] = useState("");
  //filter
  const [searchFilter, setSearchFilter] = useState("");
  const [stateFilter, setStateFilter] = useState([]);
  const [orderBy, setOrderBy] = useState();

  //header table
  const [currentSortCol, setCurrentCol] = useState("");

  //paging
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  //id asset to show detail asset
  const [userId, setUserId] = useState();

  const [isOpen, setOpen] = useState(false);
  const [isOpenDel, setOpenDel] = useState(false);
  const [isOpenMess, setOpenMess] = useState(false);
  const [message, setMessage] = useState("");
  const [assignedDate, setAssignedDate] = useState("");

  const [isDel, setDel] = useState(false);
  const fetchAssignment = async () => {
    Loading.standard("Loading...");
    // check location id
    let locationID = getLocationInSession();
    if (locationID === null) {
      alert("The administrator's location could not be found");
      Loading.remove();
      return null;
    }

    var assignedDateString = moment(assignedDate).format("DD/MM/YYYY");
    console.log(assignedDateString);

    const filter = {
      page: currentPage,
      keyword: searchFilter,
      states: stateFilter.length === 0 ? undefined : stateFilter,
      locationId: locationID,
      orderBy: orderBy,
      assignedDate: assignedDateString,
    };
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
  };

  const fetchStates = async () => {
    await AssingementService.getAllStates().then(
      (res) => {
        setStateList(res.data.sort((a, b) => a.localeCompare(b)));
      },
      (err) => {
        console.log(err.toString());
      }
    );
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
      case "No.":
        col === currentSortCol ? setOrderBy("No._DESC") : setOrderBy("id_ASC");
        break;
      case "Asset Code":
        col === currentSortCol
          ? setOrderBy("assetCode_DESC")
          : setOrderBy("assetCode_ASC");
        break;
      case "Asset Name":
        col === currentSortCol
          ? setOrderBy("assetName_DESC")
          : setOrderBy("assetName_ASC");
        break;

      case "Assigned To":
        col === currentSortCol
          ? setOrderBy("assignedTo_DESC")
          : setOrderBy("assignedTo_ASC");
        break;

      case "Assigned By":
        col === currentSortCol
          ? setOrderBy("assignedBy_DESC")
          : setOrderBy("assignedBy_ASC");
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
    return: false,
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

  const handleOpenModal = (id) => {
    setUserId(id);
    setOpen(true);
  };

  const handleInputChange = (newValue) => {
    var temp = newValue;
    setInput(temp);

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setOrderBy(null);
      setCurrentPage(0);
      setSearchFilter(temp);
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
    fetchAssignment();
  }, [currentPage, stateFilter, searchFilter, orderBy, isDel, assignedDate]);
  useEffect(() => {
    fetchAssignment();
    fetchStates();
  }, []);

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
                    selected={assignedDate}
                    onChange={(date) => setAssignedDate(date)}
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
                  navigate("/create-assignment");
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
        <AssingmentTable
          cols={cols}
          data={assignmentList}
          actions={actions}
          sortFunc={sortByCol}
          onClickRecordFunc={handleOpenModal}
          // onClickEditBtnFunc={handleEditBtn}
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
          objId={userId}
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
