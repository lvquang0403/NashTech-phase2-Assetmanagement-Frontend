import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import SearchInput from "../../components/SearchInput";
import Table from "../../components/Table";
import AssetService from "../../services/AssetService";
import CategoryService from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "../../components/icon";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import queryString from "query-string";
import ModalInfoAsset from "./ModalInfoAsset";
import ReactPaginate from "react-paginate";
import PopUpConfirm from "../../components/PopUpConfim";
import PopUpMessage from "../../components/PopUpMessage";
import PopUpCantDel from "./PopUpCantDel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getLocationInSession from "../../utils/getLocationInSession";

const ManageAsset = () => {
  const cols = [
    { name: "Asset Code", isDropdown: true },
    { name: "Asset Name", isDropdown: true },
    { name: "Category", isDropdown: true },
    { name: "State", isDropdown: true },
  ];
  const actions = {
    edit: true,
    remove: true,
    return: false,
  };

  const typingTimeOutRef = useRef(null);
  const navigate = useNavigate();
  const [cateList, setCateList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [assetList, setAssetList] = useState([]);

  const [allState, setAllState] = useState(false);
  const [allCate, setAllCate] = useState(true);
  const [input, setInput] = useState("");
  //filter
  const [searchFilter, setSearchFilter] = useState("");
  const [stateFilter, setStateFilter] = useState([
    "Available",
    "Not available",
    "Assigned",
  ]);
  const [cateFitler, setCateFilter] = useState([]);
  const [orderBy, setOrderBy] = useState();

  //header table
  const [currentSortCol, setCurrentCol] = useState("");

  //paging
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  //id asset to show detail asset
  const [assetId, setAssetId] = useState();

  //popup
  const [isOpen, setOpen] = useState(false);
  const [isOpenDel, setOpenDel] = useState(false);
  const [isOpenMess, setOpenMess] = useState(false);
  // const [message, setMessage] = useState('')

  const [isDel, setDel] = useState(false);

  const handleInputChange = (newValue) => {
    var temp = newValue;
    setInput(temp);

    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      setSearchFilter(temp.trim());
    }, 500);
  };

  const handlePageChange = (e) => {
    const { selected } = e;
    setCurrentPage(selected);
  };
  const handleCatesChange = (val) => {
    setCurrentPage(0);

    if (val === "All") {
      setAllCate(true);
      setCateFilter([]);
    } else {
      let isExisted = cateFitler.findIndex((item) => item === val);
      if (isExisted > -1) {
        let tempList = [...cateFitler];
        tempList.splice(isExisted, 1);
        setCateFilter(tempList);
      } else {
        let tempList = [...cateFitler];
        tempList.push(val);
        setCateFilter(tempList);
      }
    }
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
  useEffect(() => {
    //catefilter
    if (cateFitler.length === cateList.length || cateFitler.length === 0) {
      setAllCate(true);
    } else {
      setAllCate(false);
    }

    //statefilter
    if (stateFilter.length == stateList.length || stateFilter.length == 0) {
      setAllState(true);
    } else {
      setAllState(false);
    }
  }, [cateFitler, stateFilter]);
  useEffect(() => {
    //catefilter
    if (allCate) {
      setCateFilter([]);
    }

    //statefilter
    if (allState) {
      setStateFilter([]);
    }
  }, [allCate, allState]);

  const handleEditBtn = (id) => {
    navigate(`/edit-asset/${id}`);
  };

  const handleDelBtn = async (id) => {
    Loading.standard("Loading...");
    setAssetId(id);
    await AssetService.checkCanDelete(id).then(
      (res) => {
        setOpenDel(true);
        Loading.remove();
      },
      (err) => {
        setOpenMess(true);

        //   const resMessage =
        //     (err.response &&
        //       err.response.data &&
        //       err.response.data.message) ||
        //     err.message
        //   setMessage(resMessage)
        Loading.remove();
      }
    );
  };

  const handleDeleteAsset = async () => {
    Loading.standard("Loading...");
    await AssetService.deleteAssetById(assetId).then(
      (res) => {
        toast.success("Delete success !!!", {
          position: toast.POSITION.TOP_CENTER,
        });
        handleCloseModal();
        setDel(isDel ? false : true);
        Loading.remove();
      },
      (err) => {
        toast.error("Error !!!", {
          position: toast.POSITION.TOP_CENTER,
        });
        Loading.remove();
      }
    );
  };

  const handleOpenModal = (id) => {
    setAssetId(id);
    setOpen(true);
  };
  const handleCloseModal = (id) => {
    setOpen(false);
    setOpenDel(false);
    setOpenMess(false);
  };

  useEffect(() => {
    // var date =""
    // console.log(Object.getPrototypeOf(date));
    fetchAssets();
  }, [currentPage, stateFilter, cateFitler, searchFilter, orderBy, isDel]);
  useEffect(() => {
    fetchAssets();
    fetchCategories();
    fetchStates();
  }, []);

  const fetchAssets = async () => {
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
      states: stateFilter.length === 0 ? undefined : stateFilter,
      categories: cateFitler.length === 0 ? undefined : cateFitler,
      locationId: locationID,
      orderBy: orderBy,
    };
    let predicates = queryString.stringify(filter);
    // console.log(predicates);
    await AssetService.getAllAssets(predicates).then(
      (res) => {
        setAssetList(res.data.listResponse);
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

  const fetchCategories = async () => {
    await CategoryService.getAllCategoriesName().then(
      (res) => {
        setCateList(res.data);
      },
      (err) => {
        console.log(err.toString());
      }
    );
  };

  const fetchStates = async () => {
    await AssetService.getAllStates().then(
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

    switch (col) {
      case "Asset Code":
        col === currentSortCol ? setOrderBy("id_DESC") : setOrderBy("id_ASC");
        break;
      case "Asset Name":
        col === currentSortCol
          ? setOrderBy("name_DESC")
          : setOrderBy("name_ASC");
        break;
      case "Category":
        col === currentSortCol
          ? setOrderBy("category.name_DESC")
          : setOrderBy("category.name_ASC");
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

  return (
    <>
      <ToastContainer />
      <div className="board-container">
        <div className="title">
          <h3>Asset List</h3>
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
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  id="dropMenuFilterType"
                  data-bs-toggle="dropdown"
                  aria-expanded="true"
                >
                  Category
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
                        checked={allCate === true}
                        onChange={() => handleCatesChange("All")}
                      />
                      <label className="form-check-label">All</label>
                    </div>
                  </li>
                  {cateList.map((i, index) => (
                    <li key={index}>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={i}
                          checked={
                            cateFitler.findIndex((item) => item === i) > -1
                          }
                          onChange={() => handleCatesChange(i)}
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
                  navigate("/create-asset");
                }}
              >
                Create new asset
              </button>
            </div>
          </div>
        </div>
        <Table
          cols={cols}
          data={assetList}
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
          forcePage={currentPage}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          disabledClassName="page-disable"
          pageLinkClassName="page-num"
          previousLinkClassName="page-pre"
          nextLinkClassName="page-next"
          activeLinkClassName="active"
        />

        <ModalInfoAsset
          title="Detailed Asset Information"
          showModal={isOpen}
          closePopupFunc={handleCloseModal}
          objId={assetId}
        />
        <PopUpConfirm
          showModal={isOpenDel}
          closePopupFunc={handleCloseModal}
          yesFunc={handleDeleteAsset}
          title="Are you sure?"
          message="Do you want to delete this asset?"
          yesBtnName="Delete"
        />
        <PopUpCantDel
          showModal={isOpenMess}
          closePopupFunc={handleCloseModal}
          title="Cannot delete asset"
          id={assetId}
        />
      </div>
    </>
  );
};

export default ManageAsset;
