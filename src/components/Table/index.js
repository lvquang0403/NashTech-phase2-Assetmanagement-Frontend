import React from 'react';
import Moment from 'react-moment';
import {
    FaCaretDown,
    FaPen,
    BsXCircle
} from '../icon';

const Table = ({ cols, data, actions, sortFunc, onClickRecordFunc }) => {

    const handleSort = (col) => {
        if (sortFunc) {
            sortFunc(col)
        }
    }

    const handleOnClickRecord = (id) => {
        if (onClickRecordFunc && id != undefined) {
            onClickRecordFunc(id)
            //console.log(id);
        }
    }

    return (
        <div class="table-listing">
            <table>
                <thead>
                    <tr>
                        {cols.map((item, index) =>
                            <th class="border-bottom border-3" key={index} onClick={() => handleSort(item.name)} style={{ cursor: 'pointer' }}>{item.name}
                                {item.isDropdown && <FaCaretDown style={{ cursor: 'pointer', marginLeft: 5 }} />}
                            </th>
                        )}

                    </tr>
                </thead>
                <tbody>
                    {data &&
                        Object.values(data).map((obj, index) =>
                            <tr key={index} onClick={() => handleOnClickRecord(obj.id)} style={{ cursor: 'pointer' }} >
                                {Object.values(obj).map((value, index2) =>
                                    <td
                                        key={index2}
                                        className="border-bottom"
                                        data-bs-toggle="modal">
                                        {/* {console.log(Object.getPrototypeOf(value))} */}
                                        {value}
                                    </td>
                                )}
                                {
                                    actions &&
                                    <td>
                                        {actions["edit"] && <FaPen style={{ cursor: 'pointer', marginLeft: 15 }} />}
                                        {actions.remove && <BsXCircle style={{ cursor: 'pointer', marginLeft: 15, color: 'red' }} />}
                                        {actions.return && <>ret</>}
                                    </td>
                                }
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}



export default Table;