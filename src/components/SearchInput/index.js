import React from "react";
import { FaSearch } from "../icon";

const SearchInput = ({ input, handleInputChange }) => {
  const handleChange = (newValue) => {
    if (handleInputChange) {
      handleInputChange(newValue);
    }
  };
  return (
    <div className="search">
      <div className="input">
        <input
          type="text"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      <div>
        <button className="btn border-0" id="btnSearch">
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
