import React from 'react';
import Moment from 'react-moment';
import {
    FaCaretDown,
    FaPen,
    BsXCircle
} from '../icon';

const Table = ({ cols, data, actions, sortFunc, onClickRecordFunc, onClickEditBtnFunc, onClickDelBtn }) => {

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
    const handleOnEditBtn = (id) => {
        if (onClickEditBtnFunc && id != undefined) {
            onClickEditBtnFunc(id)
            console.log(id);
        }
    }
    const handleDelBtn = (id) => {
        if (onClickDelBtn && id != undefined) {
            onClickDelBtn(id)
            console.log(id);
        }
    }

    return (
        <div class="table-listing">
            <table>
                <thead>
                    <tr>
                        {cols.map((item, index) =>
                            <th class="border-bottom border-3" key={index} onClick={() => handleSort(item.name)} style={{ cursor: 'pointer',  whiteSpace: 'nowrap' }}>{item.name}
                                {item.isDropdown && <FaCaretDown style={{ cursor: 'pointer', marginLeft: 5 }} />}
                            </th>
                        )}

                    </tr>
                </thead>
                <tbody>
                    {data &&
                        Object.values(data).map((obj, index) =>
                            <tr key={index} style={{ cursor: 'pointer' }} >
                                {Object.values(obj).map((value, index2) =>
                                    <td onClick={() => handleOnClickRecord(obj.id)}
                                        key={index2}
                                        className="border-bottom"
                                        data-bs-toggle="modal">
                                        {value instanceof Date ? <Moment date={value} format="DD/MM/YYYY" /> : value}
                                    </td>
                                )}
                                {
                                    actions &&
                                    <td>
                                        {actions["edit"] && <FaPen style={{ cursor: 'pointer', marginLeft: 15, opacity: (obj.state === "Assigned") ? '0.3' : '1' }}
                                            onClick={() => (obj.state === "Assigned") ? null : handleOnEditBtn(obj.id)} />}
                                        {actions.remove && <BsXCircle style={{ cursor: 'pointer', marginLeft: 15, color: 'red', opacity: (obj.state === "Assigned") ? '0.3' : '1' }}
                                            onClick={() => (obj.state === "Assigned") ? null : handleDelBtn(obj.id)} />}
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