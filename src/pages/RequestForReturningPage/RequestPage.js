import React from "react";
import { FaFilter } from "react-icons/fa";
import SearchInput from "../../components/SearchInput";
import RequestTable from "./RequestTable";
import ReactPaginate from "react-paginate";
import queryString from "query-string";
import AssignmentService from "../../services/AssignmentService";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";

import { Loading } from "notiflix/build/notiflix-loading-aio";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import PopUpConfirm from "../../components/PopUpConfim";
import ReturningService from "../../services/ReturningService";

const RequestPage = () => {
  const cols = [
    { name: "No.", isDropdown: false },
    { name: "Asset Code", isDropdown: true },
    { name: "Asset Name", isDropdown: true },
    { name: "Requested By", isDropdown: true },
    { name: "Assigned Date", isDropdown: true },
    { name: "Accepted By", isDropdown: true },
    { name: "Returned Date", isDropdown: true },
    { name: "State", isDropdown: true },
  ];

  const navigate = useNavigate();
  const typingTimeOutRef = useRef(null);
  const [allState, setAllState] = useState(false);
  const [currentNo, setCurrentNo] = useState(0);

  const [returningList, setReturningList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [input, setInput] = useState("");
  //filter
  const [searchFilter, setSearchFilter] = useState("");
  const [stateFilter, setStateFilter] = useState([
    "Completed",
    "Waiting for returning",
  ]);
  const [orderBy, setOrderBy] = useState();

  //header table
  const [currentSortCol, setCurrentCol] = useState("");

  //paging
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [isOpen, setOpen] = useState(false);
  const [isOpenDel, setOpenDel] = useState(false);
  const [isOpenMess, setOpenMess] = useState(false);
  const [message, setMessage] = useState("");
  const [returnedDate, setReturnedDate] = useState(undefined);

  const [isDel, setDel] = useState(false);
  const fetchReturning = async (stateReload) => {
    Loading.standard("Loading...");
    // check location id
    var returnedDateString = undefined;

    if (returnedDate !== undefined) {
      returnedDateString = moment(returnedDate).format("YYYY-MM-DD");
      console.log("date" + returnedDate);
    }
    console.log("date String" + returnedDateString);

    const filter = {
      page: currentPage,
      keyword: searchFilter,
      states: stateFilter.length === 0 ? undefined : stateFilter,
      orderBy: orderBy,
      returnedDate: returnedDateString,
    };

    let predicates = queryString.stringify(filter);
    console.log(predicates);
    await ReturningService.getAllReturningRequests(predicates).then(
      (res) => {
        setReturningList(res.data.listResponse);
        if (res.data.listResponse != null) {
          setTotalPage(res.data.totalPage);
        }
        if (stateReload === "delete") {
          alert("successfully deleted");
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
    setStateList(["Waiting for returning", "Completed"]);
  };

  const sortByCol = (col) => {
    if (col === currentSortCol) {
      // if click same column
      setCurrentCol(""); // reset currentCol
    } else {
      // if click new column
      setCurrentCol(col); // set currentCol
    }
    const data = [...returningList];

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

      case "Requested By":
        col === currentSortCol
          ? setOrderBy("requestedBy.username_DESC")
          : setOrderBy("requestedBy.username_ASC");
        break;

      case "Accepted By":
        col === currentSortCol
          ? setOrderBy("u.username_DESC")
          : setOrderBy("u.username_ASC");
        break;

      case "Assigned Date":
        col === currentSortCol
          ? setOrderBy("assignment.assignedDate_DESC")
          : setOrderBy("assignment.assignedDate_ASC");
        break;

      case "State":
        col === currentSortCol
          ? setOrderBy("state_DESC")
          : setOrderBy("state_ASC");
        break;

      case "Returned Date":
        col === currentSortCol
          ? setOrderBy("returnedDate_DESC")
          : setOrderBy("returnedDate_ASC");
        break;

      default:
        break;
    }
  };

  const actions = {
    complete: true,
    cancel: true,
  };

  const handleReturnedDateChange = (e) => {
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }

    console.log(e.target.value);
    typingTimeOutRef.current = setTimeout(() => {
      if (e.target.value === null || e.target.value === "") {
        setReturnedDate(undefined);
      } else {
        setReturnedDate(e.target.value);
      }
    }, 1000);
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

  const handleCompleteRequest = (id) => {};

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

  const handleCancelRequest = (id) => {
    Loading.standard("Loading...");
    AssignmentService.delete(id)
      .then((response) => {
        console.log(response.data);
        fetchReturning("delete");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data && error.response.data !== "") {
          alert(error.response.data.message);
        } else {
          alert(error.message);
        }
        Loading.remove();
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
    fetchReturning("load");
    fetchStates();
  }, [currentPage, stateFilter, searchFilter, orderBy, isDel, returnedDate]);

  return (
    <>
      <div className="board-container">
        <div className="title">
          <h3>Request List</h3>
        </div>
        <label style={{ marginLeft: "260px", marginBottom: "5px" }}>
          Returned Date
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
                    onChange={(e) => handleReturnedDateChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="right-board">
            <SearchInput input={input} handleInputChange={handleInputChange} />
          </div>
        </div>

        <RequestTable
          cols={cols}
          data={returningList}
          actions={actions}
          sortFunc={sortByCol}
          currentNo={currentNo}
          onClickCompleteFunc={handleCompleteRequest}
          onClickCancelBtn={handleCancelRequest}
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
      </div>{" "}
    </>
  );
};

export default RequestPage;
