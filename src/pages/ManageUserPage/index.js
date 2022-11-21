import React, { useState, useEffect, useRef } from 'react';
import "../ManageAssetPage/index.scss";
import SearchInput from '../../components/SearchInput';
import Table from '../../components/Table';
import { useNavigate } from "react-router-dom";
import {
  FaFilter,
} from '../../components/icon';
import Paging from '../../components/Paging';
import queryString from 'query-string';
import UserService from '../../services/UserService';
import RoleService from '../../services/RoleService';
import ModalUserInfo from './ModalUserInfo';
import ReactPaginate from 'react-paginate';


const cols = [
  { name: 'Staff Code', isDropdown: true },
  { name: 'Full Name', isDropdown: true },
  { name: 'Username', isDropdown: false },
  { name: 'Joined Date', isDropdown: true },
  { name: 'Type', isDropdown: true }
]
const actions = {
  edit: true,
  remove: true,
  return: false
}

const ManageUserPage = () => {
  const typingTimeOutRef = useRef(null);
  const navigate = useNavigate();
  const [roleList, setRoleList] = useState([])
  const [userList, setUserList] = useState([])


  const [allRole, setAllRole] = useState(true)
  const [input, setInput] = useState('')
  //filter
  const [searchFilter, setSearchFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState([])
  const [orderBy, setOrderBy] = useState()

  //header table
  const [currentSortCol, setCurrentCol] = useState('')

  //paging
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0)

  //id asset to show detail asset
  const [userId, setUserId] = useState()

  const [isOpen, setOpen] = useState(false)

  const handleInputChange = (newValue) => {
    var temp = newValue
    setInput(temp)

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setOrderBy(null)
      setSearchFilter(temp)
    }, 500);
  }

  const handlePageChange = (e) => {
    const { selected } = e;
    setCurrentPage(selected)
  }
  const handleRoleChange = (val) => {
    if (val === "All") {
      var temp = allRole ? false : true
      if (temp) {
        setAllRole(temp)
        setRoleFilter([...roleList])
      } else {
        setAllRole(temp)
        setRoleFilter([])
      }
    } else {
      let isExisted = roleFilter.findIndex((item) => item === val);
      if (isExisted > -1) {
        let tempList = [...roleFilter];
        tempList.splice(isExisted, 1);
        setRoleFilter(tempList);

      }
      else {
        let tempList = [...roleFilter];
        tempList.push(val);
        setOrderBy(null)
        setRoleFilter(tempList);
      }
    }
  }

  const handleEditBtn = (id) => {
    navigate(`/manage-user/edit/${id}`)
  }

  const handleOpenModal = (id) => {
    setUserId(id)
    setOpen(true)
  }
  const handleCloseModal = (id) => {
    setOpen(false)
  }

  useEffect(() => {
    fetchUsers();
  }, [currentPage, roleFilter, searchFilter, orderBy])
  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [])

  const fetchUsers = async () => {
    const filter = {
      page: currentPage,
      keyword: searchFilter,
      types: roleFilter.length === 0 ? undefined : roleFilter,
      locationId: 1,
      orderBy: orderBy
    }
    let predicates = queryString.stringify(filter);
    console.log(predicates);
    await UserService.getAllUsers(predicates).then((res) => {
      setUserList(res.data.listResponse)
      if (res.data.listResponse != null) {
        setTotalPage(res.data.totalPage)
      }
    }, (err) => {
      console.log(err.toString());
    })
  }

  const fetchRoles = async () => {
    await RoleService.getRoleNames().then((res) => {
      setRoleList(res.data)
    }, (err) => {
      console.log(err.toString());
    })
  }



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
        col === currentSortCol
          ? setOrderBy('id_DESC')
          : setOrderBy('id_ASC')
        break;
      case "Full Name":
        col === currentSortCol
          ? setOrderBy('firstName_DESC')
          : setOrderBy('firstName_ASC')
        break;
      case "Joined Date":
        col === currentSortCol
          ? setOrderBy('joinedDate_DESC')
          : setOrderBy('joinedDate_ASC')
        break;

      case "Type":
        col === currentSortCol
          ? setOrderBy('role_DESC')
          : setOrderBy('role_ASC')
        break;
      default:
        break;
    }
  };

  return (
    <>
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
                        onChange={() => handleRoleChange("All")} />
                      <label className="form-check-label" >
                        All
                      </label>
                    </div>
                  </li>
                  {roleList.map((i, index) => (
                    <li key={index}>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={i}
                          checked={roleFilter.findIndex((item) => item === i) > -1}
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
              <button type="button" className="btn btn-danger" id="btnCreateAsset"
                onClick={() => { navigate("/manage-user/create") }}>
                Create new User
              </button>
            </div>
          </div>
        </div>
        <Table cols={cols} data={userList} actions={actions} sortFunc={sortByCol} onClickRecordFunc={handleOpenModal} onClickEditBtnFunc={handleEditBtn} />
        <ReactPaginate
          breakLabel='...'
          nextLabel='Next'
          onPageChange={handlePageChange}
          pageRangeDisplayed={2}
          pageCount={totalPage}
          previousLabel='Previous'
          renderOnZeroPageCount={null}
          containerClassName='pagination'
          disabledClassName='page-disable'
          pageLinkClassName='page-num'
          previousLinkClassName='page-pre'
          nextLinkClassName='page-next'
          activeLinkClassName='active'
        />


        <ModalUserInfo title="Detail User Infomation" showModal={isOpen} closePopupFunc={handleCloseModal} objId={userId} />
      </div>
    </>
  );
}

export default ManageUserPage