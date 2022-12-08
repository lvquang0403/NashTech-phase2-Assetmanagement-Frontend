import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChangePassFirst from "../../components/modal/ChangePassFirst";
import MyAssignmentTable from "./MyAssignmentTable";
import AssingementService from "../../services/AssignmentService";

import ReactPaginate from "react-paginate";
import queryString from "query-string";
import SearchInput from "../../components/SearchInput/index";
import moment from "moment";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import getUserIDInSession from "../../utils/getUserIDInSession";
import ModalAssignmentInfo from "../ManageAssignment/ModalAssignmentInfo";
import AssignmentService from "../../services/AssignmentService";
import ReturningService from "../../services/ReturningService";
import validateReturningCreate from "../../utils/validateReturningCreate";

const HomePage = () => {
  //First login change password!
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (window.sessionStorage.getItem("user")) {
      const userJson = window.sessionStorage.getItem("user");
      const status = JSON.parse(userJson).status;
      console.log(status);
      if (status === "") {
        setActive(true);
      }
    }
  }, []);
  //---------------------

  //------Handle user's list assignment!-----
  const navigate = useNavigate();
  const typingTimeOutRef = useRef(null);
  const [allState, setAllState] = useState(false);

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
  const [assignmentId, setAssignmentId] = useState();

  const [isOpen, setOpen] = useState(false);
  const [assignedDate, setAssignedDate] = useState("");
  const [isUpdate, setUpdate] = useState(false);

  const cols = [
    { name: "Asset Code", isDropdown: true },
    { name: "Asset Name", isDropdown: true },
    { name: "Category", isDropdown: true },
    { name: "Assigned Date", isDropdown: true },
    { name: "State", isDropdown: true },
  ];

  const fetchAssignment = async (stateReload) => {
    Loading.standard("Loading...");
    // check user id
    let userID = getUserIDInSession();
    console.log(userID);

    var assignedDateString = moment(assignedDate).format("DD/MM/YYYY");
    console.log(assignedDateString);

    const filter = {
      page: currentPage,
      orderBy: orderBy,
    };
    let predicates = queryString.stringify(filter);
    console.log(predicates);
    await AssingementService.getUserAssignments(predicates, userID).then(
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
  };

  const handleStateAssignmentChange =  async (assId ,state) => {
    Loading.standard("Loading...");
    await AssignmentService.changeStateAssignment(assId,state).then(
      (res) => {
        handleCloseModal()
        setUpdate(isUpdate ? false : true)
      },
      (err) => {
        handleCloseModal()
        Loading.remove();
      }
    );
  }

  const [assignmentList, setAssignmentList] = useState([]);
  const actions = {
    accept: true,
    deny: true,
    return: true,
  };

  const handleOpenModal = (id) => {
    setAssignmentId(id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handlePageChange = (e) => {
    const { selected } = e;
    setCurrentPage(selected);
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

      case "Category":
        col === currentSortCol
          ? setOrderBy("asset.category.name_DESC")
          : setOrderBy("asset.category.name_ASC");
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

  
  // When click button 'yes' in popup  create request for returning
  const handleCreateReturnning = (assignmentId) => {
    Loading.standard("Loading...");
    // set user id
    const userId = getUserIDInSession();
    // Validate
    const validate1 = validateReturningCreate.assignmentId(assignmentId);
    const validate2 = validateReturningCreate.requestById(userId);
    if (!validate1 || !validate2) {
      Loading.remove();
      return null;
    }
    let data = {
      requestById: userId,
      assignmentId: assignmentId
    }
    console.log(data);
    ReturningService.create(data)
    .then((response) => {
        fetchAssignment('request has been sent');
    })
    .catch((error) => {
        console.log(error);
        if (error.response.data) {
            alert(error.response.data.message)
        } else {
            alert(error.message)
        }
        fetchAssignment('load');
    });
    
  };


  useEffect(() => {
    fetchAssignment('load');
  }, [currentPage, orderBy, isUpdate]);

  useEffect(() => {
    fetchAssignment('load');
  }, []);

  return (
    <>
      <ChangePassFirst active={active} setActive={setActive}></ChangePassFirst>
      <>
        <div className="board-container">
          <div className="title">
            <h3>My Assignment</h3>
          </div>
          <div class="table-board"></div>

          <MyAssignmentTable
            cols={cols}
            data={assignmentList}
            actions={actions}
            sortFunc={sortByCol}
            onClickRecordFunc={handleOpenModal}
            onClickAccepFunc={handleStateAssignmentChange}
            onClickDelBtn={handleCreateReturnning}
          />
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageChange}
            pageRangeDisplayed={2}
            pageCount={assignmentList.length === 0 ? 0 : totalPage}
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
        </div>{" "}
      </>
    </>
  );
};

export default HomePage;
