import React, { useState, useEffect, useRef } from "react";
import "../ManageAssetPage/index.scss";
import SearchInput from "../../components/SearchInput";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "../../components/icon";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import queryString from "query-string";
import UserService from "../../services/UserService";
import RoleService from "../../services/RoleService";
import ModalUserInfo from "./ModalUserInfo";
import ReactPaginate from "react-paginate";
import PopUpConfirm from "../../components/PopUpConfim";
import PopUpMessage from "../../components/PopUpMessage";
import TableUser from "./TableUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getLocationInSession from "../../utils/getLocationInSession";

const cols = [
  { name: "Staff Code", isDropdown: true },
  { name: "Full Name", isDropdown: true },
  { name: "Username", isDropdown: false },
  { name: "Joined Date", isDropdown: true },
  { name: "Type", isDropdown: true },
];
const actions = {
  edit: true,
  remove: true,
  return: false,
};

const ManageUserPage = () => {
  const typingTimeOutRef = useRef(null);
  const navigate = useNavigate();
  const [roleList, setRoleList] = useState([]);
  const [userList, setUserList] = useState([]);

  const [allRole, setAllRole] = useState(true);
  const [input, setInput] = useState("");
  //filter
  const [searchFilter, setSearchFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState([]);
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

  const [isDel, setDel] = useState(false);

  const handleInputChange = (newValue) => {
    var temp = newValue;
    setInput(temp);

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setSearchFilter(temp.trim());
      setOrderBy(null);
      setCurrentPage(0);
    }, 500);
  };

  const handlePageChange = (e) => {
    const { selected } = e;
    setCurrentPage(selected);
  };

  const handleRoleChange = (val) => {
    setCurrentPage(0);

    if (val === "All") {
      if (allRole) {
        setAllRole(true);
        setRoleFilter([...roleList]);
      }
    } else {
      let isExisted = roleFilter.findIndex((item) => item === val);
      if (isExisted > -1) {
        let tempList = [...roleFilter];
        tempList.splice(isExisted, 1);
        setRoleFilter(tempList);
      } else {
        let tempList = [...roleFilter];
        tempList.push(val);
        setOrderBy(null);
        setRoleFilter(tempList);
      }
    }
  };

  useEffect(() => {
    if (roleFilter.length == roleList.length || roleFilter.length == 0) {
      setAllRole(true);
    } else {
      setAllRole(false);
    }
  }, [roleFilter]);
  useEffect(() => {
    if (allRole) {
      setRoleFilter([]);
    }
  }, [allRole]);

  const handleEditBtn = (id) => {
    navigate(`/manage-user/edit/${id}`);
  };

  const handleDelBtn = async (id) => {
    setUserId(id);
    await UserService.checkDisable(id).then(
      (res) => {
        setOpenDel(true);
        Loading.remove();
      },
      (err) => {
        setOpenMess(true);

        const resMessage =
          (err.response && err.response.data && err.response.data.message) ||
          err.message;
        setMessage(resMessage);
        Loading.remove();
      }
    );
  };

  const handleDisableUser = async () => {
    Loading.standard("Loading...");
    await UserService.disableUserById(userId).then(
      (res) => {
        console.log(res);
        handleCloseModal();
        setDel(isDel ? false : true);

        toast.success("Disable success !!!", {
          position: toast.POSITION.TOP_CENTER,
        });
        Loading.remove();
      },
      (err) => {
        handleCloseModal();
        console.log(err);
        toast.error("Error !!!", {
          position: toast.POSITION.TOP_CENTER,
        });
        Loading.remove();
      }
    );
  };

  const handleOpenModal = (id) => {
    setUserId(id);
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    setOpenDel(false);
    setOpenMess(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, roleFilter, searchFilter, orderBy, isDel]);
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    Loading.standard("Loading...");
    // check location id
    let locationID = getLocationInSession();
    if (locationID === null) {
      alert("The administrator's location could not be found");
      Loading.remove();
      return null;
    }
    const filter = {
      page: currentPage,
      keyword: searchFilter,
      types: roleFilter.length === 0 ? undefined : roleFilter,
      locationId: locationID,
      orderBy: orderBy,
    };
    let predicates = queryString.stringify(filter);
    console.log(predicates);
    await UserService.getAllUsers(predicates).then(
      (res) => {
        setUserList(res.data.listResponse);
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

  const fetchRoles = async () => {
    await RoleService.getRoles().then(
      (res) => {
        // console.log();
        setRoleList([...res.data].map((x) => x.name));
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
    //    const data = [...userList];

    switch (col) {
      case "Staff Code":
        col === currentSortCol ? setOrderBy("id_DESC") : setOrderBy("id_ASC");
        break;
      case "Full Name":
        col === currentSortCol
          ? setOrderBy("firstName_DESC")
          : setOrderBy("firstName_ASC");
        break;
      case "Joined Date":
        col === currentSortCol
          ? setOrderBy("joinedDate_DESC")
          : setOrderBy("joinedDate_ASC");
        break;

      case "Type":
        col === currentSortCol
          ? setOrderBy("role_DESC")
          : setOrderBy("role_ASC");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="board-container">
        <div className="title">
          <h3>User List</h3>
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
                        checked={allRole === true}
                        onChange={() => handleRoleChange("All")}
                      />
                      <label className="form-check-label">All</label>
                    </div>
                  </li>
                  {roleList.map((i, index) => (
                    <li key={index}>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={i}
                          checked={
                            roleFilter.findIndex((item) => item === i) > -1
                          }
                          onChange={() => handleRoleChange(i)}
                        />
                        <label className="form-check-label" htmlFor={i}>
                          {i}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
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
                  navigate("/manage-user/create");
                }}
              >
                Create new User
              </button>
            </div>
          </div>
        </div>
        {/* <Table cols={cols} data={userList} actions={actions} sortFunc={sortByCol} onClickRecordFunc={handleOpenModal} onClickEditBtnFunc={handleEditBtn} onClickDelBtn={handleDelBtn} /> */}
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
          forcePage={currentPage}
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
          title="Detailed User Information"
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
        <Modal
          show={isOpenMess}
          onHide={handleCloseModal}
          size="lg"
          backdrop="static"
          keyboard={false}
          size="md"
        >
          <Modal.Header
            closeButton
            style={{ color: "#cf2338", backgroundColor: "lightgrey" }}
          >
            <Modal.Title>Can not disable user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ marginTop: 20, display: "inline-block" }}>
              <p>There are valid assignments belonging to this user.</p>
              <p style={{ marginTop: -15 }}>
                Please close all assignments before disabling user.
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ManageUserPage;
