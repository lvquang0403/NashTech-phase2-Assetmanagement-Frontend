import React, { useState, useEffect, useRef } from 'react';
import "./index.scss";
import SearchInput from '../../components/SearchInput';
import Table from '../../components/Table';
import AssetService from '../../services/AssetService';
import CategoryService from '../../services/CategoryService';
import { useNavigate } from "react-router-dom";
import {
    FaFilter,
} from '../../components/icon';
import Paging from '../../components/Paging';
import queryString from 'query-string';
import ModalInfoAsset from './ModalInfoAsset';
import ReactPaginate from 'react-paginate';

const cols = [
    { name: 'Asset Code', isDropdown: true },
    { name: 'Asset Name', isDropdown: true },
    { name: 'Category', isDropdown: true },
    { name: 'State', isDropdown: true }
]
const actions = {
    edit: true,
    remove: true,
    return: false
}

const ManageAsset = () => {
    const typingTimeOutRef = useRef(null);
    const navigate = useNavigate();
    const [cateList, setCateList] = useState([])
    const [stateList, setStateList] = useState([])
    const [assetList, setAssetList] = useState([])

    const [allState, setAllState] = useState(false)
    const [allCate, setAllCate] = useState(true)
    const [input, setInput] = useState('')
    //filter
    const [searchFilter, setSearchFilter] = useState('')
    const [stateFilter, setStateFilter] = useState(['AVAILABLE', 'NOT_AVAILABLE', 'ASSIGNED'])
    const [cateFitler, setCateFilter] = useState([])

    //header table
    const [currentSortCol, setCurrentCol] = useState('')

    //paging
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0)

    //id asset to show detail asset
    const [assetId, setAssetId] = useState()

    //popup
    const [isOpen, setOpen] = useState(false)

    const handleInputChange = (newValue) => {
        var temp = newValue
        setInput(temp)

        if (typingTimeOutRef.current) {
            clearTimeout(typingTimeOutRef.current);
        }
        typingTimeOutRef.current = setTimeout(() => {
            setSearchFilter(temp)
        }, 500);
    }

    const handlePageChange = (e) => {
        const { selected } = e;
        console.log(selected);
        //console.log(newPage);
        setCurrentPage(selected)
    }
    const handleCatesChange = (val) => {
        if (val === "All") {
            var temp = allCate ? false : true
            if (temp) {
                setAllCate(temp)
                setCateFilter([...cateList])
            } else {
                setAllCate(temp)
                setCateFilter([])
            }
        } else {
            let isExisted = cateFitler.findIndex((item) => item === val);
            if (isExisted > -1) {
                let tempList = [...cateFitler];
                tempList.splice(isExisted, 1);
                setCateFilter(tempList);

            }
            else {
                let tempList = [...cateFitler];
                tempList.push(val);
                setCateFilter(tempList);
            }
        }
    }

    const handleStatesChange = (val) => {
        if (val === "All") {
            var temp = allState ? false : true
            if (temp) {
                setAllState(temp)
                setStateFilter(['AVAILABLE', 'NOT_AVAILABLE', 'ASSIGNED', 'RECYCLED', 'RECYCLING'])
            } else {
                setAllState(temp)
                setStateFilter([])
            }

        } else {
            let isExisted = stateFilter.findIndex((item) => item === val);
            if (isExisted > -1) {
                let tempList = [...stateFilter];
                tempList.splice(isExisted, 1);
                setStateFilter(tempList);

            }
            else {
                let tempList = [...stateFilter];
                tempList.push(val);
                setStateFilter(tempList);
            }
        }
    }

    const handleEditBtn = (id) => {
        navigate(`/manage-asset/edit/${id}`)
    }

    const handleOpenModal = (id) => {
        setAssetId(id)
        setOpen(true)
    }
    const handleCloseModal = (id) => {
        setOpen(false)
    }

    useEffect(() => {
        // var date =""
        // console.log(Object.getPrototypeOf(date));
        fetchAssets();
    }, [currentPage, stateFilter, cateFitler, searchFilter])
    useEffect(() => {
        fetchAssets();
        fetchCategories();
        fetchStates();
    }, [])

    const fetchAssets = async () => {
        const filter = {
            page: currentPage,
            keyword: searchFilter,
            states: stateFilter.length === 0 ? undefined : stateFilter,
            categories: cateFitler.length === 0 ? undefined : cateFitler,
            locationId: 1,
        }
        let predicates = queryString.stringify(filter);
        // console.log(predicates);
        await AssetService.getAllAssets(predicates).then((res) => {
            setAssetList(res.data.listResponse)
            if (res.data.listResponse != null) {
                setTotalPage(res.data.totalPage)
            }
        }, (err) => {
            console.log(err.toString());
        }
        )
    }

    const fetchCategories = async () => {
        await CategoryService.getAllCategories().then((res) => {
            setCateList(res.data)
        }, (err) => {
            console.log(err.toString());
        })
    }

    const fetchStates = async () => {
        await AssetService.getAllStates().then((res) => {
            setStateList(res.data)
        },
            (err) => {
                console.log(err.toString());
            }
        )
    }

    const sortByCol = (col) => {
        if (col === currentSortCol) {
            // if click same column
            setCurrentCol(""); // reset currentCol
        } else {
            // if click new column
            setCurrentCol(col); // set currentCol
        }
        const data = [...assetList];

        switch (col) {
            case "Asset Code":
                col === currentSortCol
                    ? setAssetList(data.sort((a, b) => a.id.localeCompare(b.id)))
                    : setAssetList(data.sort((a, b) => b.id.localeCompare(a.id)));
                break;
            case "Asset Name":
                col === currentSortCol
                    ? setAssetList(data.sort((a, b) => a.name.localeCompare(b.name)))
                    : setAssetList(data.sort((a, b) => b.name.localeCompare(a.name)));
                break;
            case "Category":
                col === currentSortCol
                    ? setAssetList(data.sort((a, b) => a.category.localeCompare(b.category)))
                    : setAssetList(data.sort((a, b) => b.category.localeCompare(a.category)));
                break;

            case "State":
                col === currentSortCol
                    ? setAssetList(data.sort((a, b) => a.state.localeCompare(b.state)))
                    : setAssetList(data.sort((a, b) => b.state.localeCompare(a.state)));
                break;
            default:
                break;
        }
    };

    return (
        <>
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
                                                onChange={() => handleStatesChange("All")} />
                                            <label className="form-check-label" >
                                                All
                                            </label>
                                        </div>
                                    </li>
                                    {stateList.map((i, index) => (
                                        <li key={index}>
                                            <div>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={i}
                                                    checked={stateFilter.findIndex((item) => item === i) > -1}
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
                                                onChange={() => handleCatesChange("All")} />
                                            <label className="form-check-label" >
                                                All
                                            </label>
                                        </div>
                                    </li>
                                    {cateList.map((i, index) => (
                                        <li key={index}>
                                            <div>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={i}
                                                    checked={cateFitler.findIndex((item) => item === i) > -1}
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
                            <button type="button" className="btn btn-danger" id="btnCreateAsset"
                                onClick={() => { navigate("/create-asset") }}>
                                Create new asset
                            </button>
                        </div>
                    </div>
                </div>
                <Table cols={cols} data={assetList} actions={actions} sortFunc={sortByCol} onClickRecordFunc={handleOpenModal} onClickEditBtnFunc={handleEditBtn} />

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

                <ModalInfoAsset title="Detail Asset Infomation" showModal={isOpen} closePopupFunc={handleCloseModal} objId={assetId} />
            </div>
        </>
    );
}

export default ManageAsset;