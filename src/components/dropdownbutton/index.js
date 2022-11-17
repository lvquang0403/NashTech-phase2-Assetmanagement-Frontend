import React from 'react';
import PropTypes from 'prop-types'
import {
    FaFilter,
} from '../icon';

dropdownbutton.propTypes = {
    data: PropTypes.array,
    handleSelect: PropTypes.func
}

dropdownbutton.defaultProps = {
    data: [],
    handleSelect: null
}


const dropdownbutton = (props) => {
    const { data, handleSelect } = props;

    return (
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
                {data.map((i) => (
                    <li key={i.id}>
                      <div>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value={i.id}
                          id={i.id}
                          checked={filterByCategory === i.id}
                          onChange={() => handleFilterByCategory(i.id)}
                        />
                        <label className="form-check-label" htmlFor={i.id}>
                          {i.name}
                        </label>
                      </div>
                    </li>
                  ))}
                <li>
                    <div>
                        <input
                            className="form-check-input"
                            type="checkbox"

                        />
                        <label className="form-check-label" >
                            asdasdasdsd
                        </label>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default index;