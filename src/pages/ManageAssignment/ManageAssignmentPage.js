import React from "react";
import ReactPaginate from "react-paginate";
import AssignmentTable from "./AssignmentTable";
import queryString from "query-string";
import SearchInput from "../../components/SearchInput/index";
import AssignmentService from "../../services/AssignmentService";
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

import "./ManageAssignmentPage.css";
import PopUpConfirm from "../../components/PopUpConfim";
import ReturningService from "../../services/ReturningService";
import validateReturningCreate from "../../utils/validateReturningCreate";
import getUserIDInSession from "../../utils/getUserIDInSession";


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

  // load default => stateReload = 'load'
  const fetchAssignment = async (stateReload) => {
    Loading.standard("Loading...");
    // check location id
    var assignedDateString = undefined;

    if (assignedDate !== undefined) {
      assignedDateString = moment(assignedDate).format("YYYY-MM-DD");
      console.log("date" + assignedDate);
    }
    console.log("date String" + assignedDateString);

    const filter = {
      page: currentPage,
      keyword: searchFilter,
      states: stateFilter.length === 0 ? undefined : stateFilter,
      orderBy: orderBy,
      assignDate: assignedDateString,
    };

    let predicates = queryString.stringify(filter);
    console.log(predicates);
    await AssignmentService.getAllAssignments(predicates).then(
      (res) => {
        setAssignmentList(res.data.listResponse);
        if (res.data.listResponse != null) {
          setTotalPage(res.data.totalPage);
        }
        // alert content load
        if(stateReload){
          if ("load" !== stateReload) {
            alert(stateReload);
          }
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

  const handleAssignedDateChange = (e) => {
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }

    console.log(e.target.value);
    typingTimeOutRef.current = setTimeout(() => {
      if (e.target.value === null || e.target.value === "") {
        setAssignedDate(undefined);
      } else {
        setAssignedDate(e.target.value);
      }
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
    navigate("/manage-assignment/edit-assignment/" + id);
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
    setCurrentPage(0);

    if (val === "All") {
      setAllState(true);
      setStateFilter([]);
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
  
  const handleDeleteAssignment = (id) => {
    Loading.standard("Loading...");
    AssignmentService.delete(id)
      .then((response) => {
        console.log(response.data);
        fetchAssignment("successfully deleted");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data && error.response.data !== "") {
          fetchAssignment(error.response.data.message);
        } else {
          fetchAssignment(error.message);
        }
      });
  };

  // When click button 'yes' in popup  create request for returning
  const handleClickYesReturnBtn = (id) => {
    Loading.standard("Loading...");
    // set user id
    const userId = getUserIDInSession();
    // Validate
    const validateaAsignment = validateReturningCreate.assignmentId(id);
    const validateUserId = validateReturningCreate.requestById(userId);
    if (!validateaAsignment || !validateUserId) {
      Loading.remove();
      return null;
    }
    let data = {
      requestById: userId,
      assignmentId: id
    }
    ReturningService.create(data)
    .then((response) => {
      console.log(response.data);
        fetchAssignment('request has been sent')
    })
    .catch((error) => {
        console.log(error);
        if (error.response.data) {
            alert(error.response.data.message)
        } else {
            alert(error.message)
        }
        fetchAssignment('load')
    });
  };


  useEffect(() => {
    if (stateFilter.length === stateList.length || stateFilter.length === 0) {
      setAllState(true);
    } else {
      setAllState(false);
    }
  }, [stateFilter]);
  useEffect(() => {
    if (allState) {
      setStateFilter([]);
    }
  }, [allState]);

  useEffect(() => {
    //Loading.standard("Loading...");
    fetchAssignment("load");
    fetchStates();
  }, [currentPage, stateFilter, searchFilter, orderBy, isDel, assignedDate]);

  // useEffect(() => {
  //   typingTimeOutRef.current = setTimeout(() => {

  //     fetchAssignment('load');
  //     fetchStates();

  //   }, 5000);
  // }, []);



  return (
    <>
      <div className="board-container">
        <div className="title">
          <h3>Assignment List</h3>
        </div>
        <label style={{ marginLeft: "260px", marginBottom: "5px" }}>
          Assigned Date
        </label>

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
                  <input
                    className="btn btn-outline-secondary dropdown-toggle"
                    min="1900-01-01"
                    max="3000-01-01"
                    type="date"
                    onChange={(e) => handleAssignedDateChange(e)}
                  />

                  {/* <DatePicker
                    className="btn btn-outline-secondary dropdown-toggle"
                    dateFormat="dd/MM/yyyy"
                    selected={assignedDate}
                    onChange={(date) => handleAssignedDateChange(date)}
                    placeholderText="Assigned Date    🗓️"
                  /> */}
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
          onClickDeleteBtn={handleDeleteAssignment}
          onClickReturnBtn={handleClickYesReturnBtn}
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
          title="Detailed Assignment Information"
          showModal={isOpen}
          closePopupFunc={handleCloseModal}
          objId={assignmentId}
        />

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
