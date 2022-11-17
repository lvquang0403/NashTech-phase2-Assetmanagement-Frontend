import React, { useState, useEffect } from 'react';
import {
    FaFilter,
} from '../../components/icon';
import "./index.scss";
import SearchInput from '../../components/SearchInput';
import Table from '../../components/Table';
import AssetService from '../../services/AssetService';
import CategoryService from '../../services/CategoryService';
import StateService from '../../services/StateService';
import { useNavigate } from "react-router-dom";

const tempData = [
    { id: "SD001", name: "Dell xps 9720", category: "laptop", state: "Available" },
    { id: "SD002", name: "ASUS ROG Zephyrus Duo", category: "laptop", state: "Not Available" },
    { id: "SD003", name: " ThinkBook 15 G4", category: "laptop", state: "Available" },
    { id: "SD004", name: "Iphone 14 ProMax", category: "smartphone", state: "Available" },
    { id: "SD001", name: "Dell xps 9720", category: "laptop", state: "Available" },
    { id: "SD002", name: "ASUS ROG Zephyrus Duo", category: "laptop", state: "Not Available" },
    { id: "SD003", name: " ThinkBook 15 G4", category: "laptop", state: "Available" },
    { id: "SD004", name: "Iphone 14 ProMax", category: "smartphone", state: "Available" },
    { id: "SD001", name: "Dell xps 9720", category: "laptop", state: "Available" },
    { id: "SD002", name: "ASUS ROG Zephyrus Duo", category: "laptop", state: "Not Available" },
    { id: "SD003", name: " ThinkBook 15 G4", category: "laptop", state: "Available" },
    { id: "SD004", name: "Iphone 14 ProMax", category: "smartphone", state: "Available" },
]
const tempState = [
    'Available', 'Not Available', 'Assigned', 'Waiting for recycling', 'Recycled'
]

const tempCate = [
    'Laptop', 'Smartphone'
]


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
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState([])
    const [cateList, setCateList] = useState(tempCate)
    const [stateList, setStateList] = useState(tempState)
    const [assetList, setAssetList] = useState(tempData)
    const [currentSortCol, setCurrentCol] = useState('')

    const handleInputChange = (newValue) => {
        setSearchInput(newValue)
    }

    const sortByCol = (col) => {
        console.log("sort " + col);
        if (col === currentSortCol) {
            // if click same column
            setCurrentCol(""); // reset currentCol
          } else {
            // if click new column
            setCurrentCol(col); // set currentCol
          }
        const _data = [...assetList];

        switch (col) {
            case "Asset Code":
                col === currentSortCol
                    ? setAssetList(_data.sort((a, b) => a.id.localeCompare(b.id)))
                    : setAssetList(_data.sort((a, b) => b.id.localeCompare(a.id)));
                break;
            case "Asset Name":
                col === currentSortCol
                    ? setAssetList(_data.sort((a, b) => a.name.localeCompare(b.name)))
                    : setAssetList(_data.sort((a, b) => b.name.localeCompare(a.name)));
                break;
            case "Category":
                col === currentSortCol
                    ? setAssetList(_data.sort((a, b) => a.category.localeCompare(b.category)))
                    : setAssetList(_data.sort((a, b) => b.category.localeCompare(a.category)));
                break;

            case "State":
                col === currentSortCol
                    ? setAssetList(_data.sort((a, b) => a.state.localeCompare(b.state)))
                    : setAssetList(_data.sort((a, b) => b.state.localeCompare(a.state)));
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        console.log(assetList);
        // fetchAssets();
        // fetchCategories();
        // fetchStates();
    }, [])

    const fetchAssets = async (productId) => {
        await AssetService.getAllAssets(productId).then((res) => {
            setAssetList(res.data)
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
        }
        )
    }

    const fetchStates = async () => {
        await StateService.getAllStates().then((res) => {
            setStateList(res.data)
        },
            (err) => {
                console.log(err.toString());
            }
        )
    }

    return (
        <>
            <div class="board-container">
                <div class="title">
                    <h3>Asset List</h3>
                </div>
                <div class="table-board">
                    <div class="left-board">
                        <div class="filter">

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

                                            />
                                            <label className="form-check-label" >
                                                All
                                            </label>
                                        </div>
                                    </li>
                                    {
                                        stateList.map((item, index) =>
                                            <li key={index}>
                                                <div>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                    // checked={filterByCategory === "ALL"}
                                                    // onClick={() => handleFilterByCategory("ALL")}
                                                    />
                                                    <label className="form-check-label" >
                                                        {item}
                                                    </label>
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                            <div className="dropdown" >
                                <button
                                    className="btn btn-outline-secondary dropdown-toggle"
                                    type="button"
                                    id="dropMenuFilterType"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Category
                                    <div >
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
                                                value="All"
                                                id="typeAll"
                                            // checked={filterByCategory === "ALL"}
                                            // onClick={() => handleFilterByCategory("ALL")}
                                            />
                                            <label className="form-check-label" htmlFor="typeAll">
                                                All
                                            </label>
                                        </div>
                                    </li>
                                    {
                                        cateList.map((item, index) =>
                                            <li key={index}>
                                                <div>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                    // checked={filterByCategory === "ALL"}
                                                    // onClick={() => handleFilterByCategory("ALL")}
                                                    />
                                                    <label className="form-check-label" >
                                                        {item}
                                                    </label>
                                                </div>
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="right-board">
                        <SearchInput input={searchInput} handleInputChange={handleInputChange} />
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
                <Table cols={cols} data={assetList} actions={actions} sortFunc={sortByCol} />
                <div class="paging">

                </div>
            </div>
        </>
    );
}

export default ManageAsset;