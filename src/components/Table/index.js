import React from 'react';
import {
    FaCaretDown,
    FaPen,
    BsXCircle
} from '../icon';

const Table = ({ cols, data, actions, sortFunc }) => {

    const handleSort = (col) => {
        if (sortFunc) {
            sortFunc(col)
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
                    {Object.values(data).map((obj, index) =>
                        <tr key={index}>
                            {Object.values(obj).map((value, index2) =>
                                <td
                                    key={index2}
                                    className="border-bottom"
                                    data-bs-toggle="modal">
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
                    )}
                </tbody>
            </table>
        </div>
    );
}



export default Table;